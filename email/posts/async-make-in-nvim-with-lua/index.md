# [Asynchronous :make in Neovim with Lua](https://phelipetls.github.io/posts/async-make-in-nvim-with-lua/)

August 12, 2020 · 3 min. read time

---

<p>The <code>:make</code> command in Vim is quite useful, it runs whatever program is under
the <code>makeprg</code> option and returns its output in the quickfix list, where you&rsquo;ll
be able to hop through the errors if they were parsed correctly by the
<code>errorformat</code> option.</p>
<p>For example, if you want to lint a Python file with <code>flake8</code>, it would suffice
to</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vim" data-lang="vim"><span class="nx">setlocal</span> <span class="nx">makeprg</span><span class="p">=</span><span class="nx">flake8</span>\ %<span class="err">
</span><span class="err"></span><span class="nx">setlocal</span> <span class="nx">errorformat</span><span class="p">=</span>%<span class="nx">f</span>:%<span class="nx">l</span>:%<span class="nx">c</span>:\ %<span class="nx">t</span>%<span class="nx">n</span>\ %<span class="nx">m</span><span class="err">
</span></code></pre></div><p>Or, you could create a <code>:h compiler</code> plugin named <code>flake8</code>, that set these
options when you run <code>:compiler flake8</code>,
<a href="https://github.com/phelipetls/dotfiles/blob/master/.config/nvim/compiler/flake8.vim">as I have in my config</a>.</p>
<p>There are a bunch of compiler plugins built into Vim that you might be
interested, for example, <code>:compiler pyunit</code> for test suites written with the
<code>unittest</code> library.</p>
<p>It works great once you have these options set correctly (although the
<code>errorformat</code> can be tricky).</p>
<p>The only &ldquo;problem&rdquo; is that it is synchronous. Which means that for some
expensive programs, you will not be able to edit until it finishes. In this post
we will solve this in Neovim with Lua.</p>
<p>In a previous revision of this post, I used
<a href="https://github.com/luvit/luv/blob/master/docs.md">libuv bindings for Lua</a>,
accessible under <code>vim.loop</code>, but this is kind of a low level approach. An
alternative is to use the <code>jobstart()</code> function, which offers several
conveniences.</p>
<p>I put the following Lua script under <code>~/.config/nvim/lua/</code> (if you use Neovim
you can get yours with <code>:echo stdpath(&quot;config&quot;)</code>) for it to be available at
runtime as <a href="https://www.tutorialspoint.com/lua/lua_modules.htm">Lua module</a>,
named <code>async_make</code>.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lua" data-lang="lua"><span class="kd">local</span> <span class="n">M</span> <span class="o">=</span> <span class="p">{}</span>

<span class="kr">function</span> <span class="nc">M</span><span class="p">.</span><span class="nf">make</span><span class="p">()</span>
  <span class="kd">local</span> <span class="n">lines</span> <span class="o">=</span> <span class="p">{</span><span class="s2">&#34;&#34;</span><span class="p">}</span>
  <span class="kd">local</span> <span class="n">winnr</span> <span class="o">=</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">win_getid</span><span class="p">()</span>
  <span class="kd">local</span> <span class="n">bufnr</span> <span class="o">=</span> <span class="n">vim.api</span><span class="p">.</span><span class="n">nvim_win_get_buf</span><span class="p">(</span><span class="n">winnr</span><span class="p">)</span>

  <span class="kd">local</span> <span class="n">makeprg</span> <span class="o">=</span> <span class="n">vim.api</span><span class="p">.</span><span class="n">nvim_buf_get_option</span><span class="p">(</span><span class="n">bufnr</span><span class="p">,</span> <span class="s2">&#34;makeprg&#34;</span><span class="p">)</span>
  <span class="kr">if</span> <span class="ow">not</span> <span class="n">makeprg</span> <span class="kr">then</span> <span class="kr">return</span> <span class="kr">end</span>

  <span class="kd">local</span> <span class="n">cmd</span> <span class="o">=</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">expandcmd</span><span class="p">(</span><span class="n">makeprg</span><span class="p">)</span>

  <span class="kd">local</span> <span class="kr">function</span> <span class="nf">on_event</span><span class="p">(</span><span class="n">job_id</span><span class="p">,</span> <span class="n">data</span><span class="p">,</span> <span class="n">event</span><span class="p">)</span>
    <span class="kr">if</span> <span class="n">event</span> <span class="o">==</span> <span class="s2">&#34;stdout&#34;</span> <span class="ow">or</span> <span class="n">event</span> <span class="o">==</span> <span class="s2">&#34;stderr&#34;</span> <span class="kr">then</span>
      <span class="kr">if</span> <span class="n">data</span> <span class="kr">then</span>
        <span class="n">vim.list_extend</span><span class="p">(</span><span class="n">lines</span><span class="p">,</span> <span class="n">data</span><span class="p">)</span>
      <span class="kr">end</span>
    <span class="kr">end</span>

    <span class="kr">if</span> <span class="n">event</span> <span class="o">==</span> <span class="s2">&#34;exit&#34;</span> <span class="kr">then</span>
      <span class="n">vim.fn</span><span class="p">.</span><span class="n">setqflist</span><span class="p">({},</span> <span class="s2">&#34; &#34;</span><span class="p">,</span> <span class="p">{</span>
        <span class="n">title</span> <span class="o">=</span> <span class="n">cmd</span><span class="p">,</span>
        <span class="n">lines</span> <span class="o">=</span> <span class="n">lines</span><span class="p">,</span>
        <span class="n">efm</span> <span class="o">=</span> <span class="n">vim.api</span><span class="p">.</span><span class="n">nvim_buf_get_option</span><span class="p">(</span><span class="n">bufnr</span><span class="p">,</span> <span class="s2">&#34;errorformat&#34;</span><span class="p">)</span>
      <span class="p">})</span>
      <span class="n">vim.api</span><span class="p">.</span><span class="n">nvim_command</span><span class="p">(</span><span class="s2">&#34;doautocmd QuickFixCmdPost&#34;</span><span class="p">)</span>
    <span class="kr">end</span>
  <span class="kr">end</span>

  <span class="kd">local</span> <span class="n">job_id</span> <span class="o">=</span>
    <span class="n">vim.fn</span><span class="p">.</span><span class="n">jobstart</span><span class="p">(</span>
    <span class="n">cmd</span><span class="p">,</span>
    <span class="p">{</span>
      <span class="n">on_stderr</span> <span class="o">=</span> <span class="n">on_event</span><span class="p">,</span>
      <span class="n">on_stdout</span> <span class="o">=</span> <span class="n">on_event</span><span class="p">,</span>
      <span class="n">on_exit</span> <span class="o">=</span> <span class="n">on_event</span><span class="p">,</span>
      <span class="n">stdout_buffered</span> <span class="o">=</span> <span class="kc">true</span><span class="p">,</span>
      <span class="n">stderr_buffered</span> <span class="o">=</span> <span class="kc">true</span><span class="p">,</span>
    <span class="p">}</span>
  <span class="p">)</span>
<span class="kr">end</span>

<span class="kr">return</span> <span class="n">M</span>
</code></pre></div><p>This function first get the current window number and the buffer in it, which I
will then use to get the local values of <code>makeprg</code> and <code>errorformat</code>.</p>
<p>Then I expand the <code>makeprg</code> with <code>expandcmd()</code>, which transforms something like
<code>make %</code> to <code>make ~/program.c</code>, and store it in a variable to be used by
<code>jobstart()</code>.</p>
<p>Then I create the function <code>on_event</code> to be a catch-all handler for job events.
The callbacks passed to <code>on_stdout</code>, <code>on_stderr</code> and <code>on_exit</code> will receive the
following arguments: <code>({chan-id}, {data}, {name})</code>. So we take advantage of the
third parameter here (see <code>:h channel-callback</code>).</p>
<p>When we receive data from <code>stdout</code> and <code>stderr</code>, we extend the <code>lines</code> variable
with it. Because of <code>stdout_buffered</code> and <code>stderr_buffered</code>, the callback will
only be called when all of the output was gathered (see <code>:h channel-buffered</code>).</p>
<p>When the program exits, we populate the quickfix list. This is done with
<code>:h setqflist()</code>. We give it a title (the expanded <code>makeprg</code>), the lines to be
parsed and the <code>errorformat</code> to parse the lines with.</p>
<p>Finally we trigger whatever <code>autocmd</code> is under the <code>QuickFixCmdPost</code> event.</p>
<p>Then, I&rsquo;m able to use it inside <code>nvim</code> like this:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vim" data-lang="vim"><span class="nx">command</span><span class="p">!</span> <span class="nx">Make</span> <span class="nx">silent</span> <span class="nx">lua</span> <span class="nx">require</span><span class="s1">&#39;async_make&#39;</span>.<span class="nx">make</span><span class="p">()</span><span class="err">
</span><span class="err"></span><span class="nx">nnoremap</span> <span class="p">&lt;</span><span class="nx">silent</span><span class="p">&gt;</span> <span class="p">&lt;</span><span class="nx">space</span><span class="p">&gt;</span><span class="nx">m</span> :<span class="nx">Make</span><span class="p">&lt;</span><span class="nx">CR</span><span class="p">&gt;</span><span class="err">
</span></code></pre></div><p>Then, if you may wish to run it on save, use this:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vim" data-lang="vim"><span class="nx">augroup</span> <span class="nx">LintOnSave</span><span class="err">
</span><span class="err"></span>  <span class="nx">autocmd</span><span class="p">!</span> <span class="nx">BufWritePost</span> <span class="p">&lt;</span><span class="nx">buffer</span><span class="p">&gt;</span> <span class="nx">Make</span><span class="err">
</span><span class="err"></span><span class="nx">augroup</span> <span class="nx">END</span><span class="err">
</span></code></pre></div><p>A command to disable it is convenient (you can re-enable it with <code>:e&lt;CR&gt;</code>):</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vim" data-lang="vim"><span class="nx">command</span><span class="p">!</span> <span class="nx">DisableLintOnSave</span> <span class="nx">autocmd</span><span class="p">!</span> <span class="nx">LintOnSave</span> <span class="nx">BufWritePost</span> <span class="p">&lt;</span><span class="nx">buffer</span><span class="p">&gt;</span><span class="err">
</span></code></pre></div><p><a href="https://gist.github.com/phelipetls/639a1b5f021d17c4124cccc83e518566">Get the full code in this gist</a>.</p>

