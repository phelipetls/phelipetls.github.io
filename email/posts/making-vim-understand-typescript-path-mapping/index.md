# [Making Vim understand TypeScript path mapping](https://phelipetls.github.io/posts/making-vim-understand-typescript-path-mapping/)

September 15, 2021 · 6 min. read time

---

<p>Vim has this well-known feature of opening the path under cursor with <a href="http://vimdoc.sourceforge.net/htmldoc/editing.html#gf"><code>:h gf</code></a>. <a href="https://vim.fandom.com/wiki/Open_file_under_cursor">This article
explains well how this
works</a>.</p>
<p>Things work out of the box with full paths with no special characters, like
<code>/home/phelipe/script.js</code>, but it also expands <code>~</code> and environment variables,
like <code>$HOME/script.js</code> or <code>~/script.js</code>.</p>
<p>Things don&rsquo;t work well when languages have special syntax to import a file,
which is most languages. For example, Java:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-java" data-lang="java"><span class="kn">import</span> <span class="nn">foo.bar</span>
</code></pre></div><p>Or Python:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="kn">import</span> <span class="nn">module</span>
<span class="kn">import</span> <span class="nn">.module</span>
<span class="kn">import</span> <span class="nn">..module</span>
</code></pre></div><p>But it&rsquo;s possible to configure Vim to understand this special syntax with the
<a href="http://vimdoc.sourceforge.net/htmldoc/options.html#'includeexpr'"><code>:h includeexpr</code></a>
option, which is a function that receives the filename in the special variable
<code>v:fname</code> so you can manipulate it.</p>
<p>For Java, such a function could just replace <code>.</code> with <code>/</code>, but for Python <a href="https://github.com/vim/vim/blob/4b4b1b84eee70b74fa3bb57624533c65bafd8428/runtime/ftplugin/python.vim#L19,L35">it&rsquo;s
more
complicated</a>.</p>
<p>In the JavaScript world this is even more complex&hellip; We have <a href="https://webpack.js.org/configuration/resolve/">webpack
aliases</a>, <a href="https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring">Jest&rsquo;s
moduleNameMapper</a>
and much more.</p>
<p>The TypeScript compiler has this feature as well, it&rsquo;s called <a href="https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping">path
mapping</a>.</p>
<p>For example, to import a component from <code>src/components</code> from anywhere with
just <code>~/components</code>, you&rsquo;d use the following <code>tsconfig.json</code>:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-json" data-lang="json"><span class="p">{</span>
  <span class="nt">&#34;compilerOptions&#34;</span><span class="p">:</span> <span class="p">{</span>
   <span class="nt">&#34;baseUrl&#34;</span><span class="p">:</span> <span class="s2">&#34;.&#34;</span><span class="p">,</span>
    <span class="nt">&#34;paths&#34;</span><span class="p">:</span> <span class="p">{</span>
      <span class="nt">&#34;~/*&#34;</span><span class="p">:</span> <span class="p">[</span><span class="s2">&#34;src/*&#34;</span><span class="p">]</span>
    <span class="p">}</span>
  <span class="p">}</span>
<span class="p">}</span>
</code></pre></div><p>This is great but it breaks <code>gf</code>, so in this post I want to share how to make
it work again for TypeScript projects that use this feature.</p>
<h1>
  Why not LSP?
</h1>
<p>You might be wondering why not just use a language server for that?</p>
<p>And you&rsquo;d be right, that&rsquo;s certainly better than implementing the TypeScript
module resolution algorithm in Lua&hellip;</p>
<p>But the TypeScript language servers are very resource hungry and slow to boot,
so I find that it does pay off to use a dumber way to navigate files with
built-in Vim features in case the language server is still booting or just
being slow.</p>
<h1>
  Implementation details
</h1>
<p>Our goal is to pass a function to the <code>includeexpr</code> option that will try to
substitute the &ldquo;alias&rdquo; (<code>~/*</code>) with its associated path (<code>src/*</code>) until it
finds a file/directory that exists, then return it. Otherwise, return <code>nil</code>.</p>
<p>I decided to write it in Lua in the <code>lua/tsconfig.lua</code> module. Here&rsquo;s how we
can configure the <code>includeexpr</code> for JavaScript/TypeScript to use this lua
function:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vim" data-lang="vim"><span class="c">&#34; after/ftplugin/javascript.vim</span><span class="err">
</span><span class="err"></span><span class="c">&#34; after/ftplugin/typescript.vim</span><span class="err">
</span><span class="err"></span><span class="c">
</span><span class="c">&#34; It&#39;s common in JavaScript to omit the file extension</span><span class="err">
</span><span class="err"></span><span class="c">&#34; Also some plugins mess this up so I overwite it...</span><span class="err">
</span><span class="err"></span><span class="nx">setlocal</span> <span class="nx">suffixesadd</span><span class="p">=</span>.<span class="nx">js</span><span class="p">,</span>.<span class="nx">jsx</span><span class="p">,</span>.<span class="nx">ts</span><span class="p">,</span>.<span class="nx">tsx</span><span class="p">,</span>.<span class="nx">d</span>.<span class="nx">ts</span><span class="err">
</span><span class="err">
</span><span class="err"></span><span class="k">if</span> <span class="nx">has</span><span class="p">(</span><span class="s2">&#34;nvim&#34;</span><span class="p">)</span><span class="err">
</span><span class="hl"><span class="err"></span>  <span class="nx">setlocal</span> <span class="nx">includeexpr</span><span class="p">=</span><span class="nx">luaeval</span><span class="p">(</span>\<span class="s2">&#34;require&#39;tsconfig&#39;.includeexpr(_A)\&#34;</span><span class="p">,</span><span class="nx">v</span>:<span class="nx">fname</span><span class="p">)</span><span class="err">
</span></span><span class="err"></span><span class="k">endif</span><span class="err">
</span></code></pre></div><p>And here&rsquo;s an skeleton of the Lua module:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lua" data-lang="lua"><span class="c1">-- lua/tsconfig.lua</span>

<span class="kd">local</span> <span class="n">M</span> <span class="o">=</span> <span class="p">{}</span>

<span class="kd">local</span> <span class="kr">function</span> <span class="nf">expand_tsconfig_path</span><span class="p">(</span><span class="n">input</span><span class="p">)</span>
  <span class="kd">local</span> <span class="n">tsconfig_file</span> <span class="o">=</span> <span class="n">get_tsconfig_file</span><span class="p">()</span>

  <span class="kr">if</span> <span class="ow">not</span> <span class="n">tsconfig_file</span> <span class="kr">then</span>
    <span class="kr">return</span> <span class="n">input</span>
  <span class="kr">end</span>

  <span class="kd">local</span> <span class="n">alias_to_paths</span> <span class="o">=</span> <span class="n">get_tsconfig_paths</span><span class="p">(</span><span class="n">tsconfig_file</span><span class="p">)</span>

  <span class="kr">if</span> <span class="ow">not</span> <span class="n">alias_to_paths</span> <span class="kr">then</span>
    <span class="kr">return</span> <span class="n">input</span>
  <span class="kr">end</span>

  <span class="kr">for</span> <span class="n">alias</span><span class="p">,</span> <span class="n">path</span> <span class="kr">in</span> <span class="n">pairs</span><span class="p">(</span><span class="n">alias_to_paths</span><span class="p">)</span> <span class="kr">do</span>
    <span class="c1">-- TODO: work to find a file that exists</span>
  <span class="kr">end</span>

  <span class="kr">return</span> <span class="n">input</span>
<span class="kr">end</span>

<span class="kr">function</span> <span class="nc">M</span><span class="p">.</span><span class="nf">includeeexpr</span><span class="p">(</span><span class="n">input</span><span class="p">)</span>
  <span class="kd">local</span> <span class="n">path</span> <span class="o">=</span> <span class="n">expand_tsconfig_path</span><span class="p">(</span><span class="n">input</span><span class="p">)</span>
  <span class="kr">return</span> <span class="n">path</span>
<span class="kr">end</span>

<span class="kr">return</span> <span class="n">M</span>
</code></pre></div><p>How exactly we try to find a file will be explained later.</p>
<h2>
  Finding <code>tsconfig.json</code>
</h2>
<p>Let&rsquo;s start with the <code>get_tsconfig_file</code> function. We can do this by searching
upwards starting from the current file&rsquo;s directory with the <a href="https://vimhelp.org/eval.txt.html#findfile()"><code>:h findfile</code></a> function:
<code>findfile('tsconfig.json', '.;')</code>.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lua" data-lang="lua"><span class="kd">local</span> <span class="kr">function</span> <span class="nf">get_tsconfig_file</span><span class="p">()</span>
  <span class="kr">return</span> <span class="n">find_file</span><span class="p">(</span><span class="s2">&#34;tsconfig.json&#34;</span><span class="p">,</span> <span class="s2">&#34;.;&#34;</span><span class="p">)</span> <span class="ow">or</span> <span class="n">find_file</span><span class="p">(</span><span class="s2">&#34;jsconfig.json&#34;</span><span class="p">,</span> <span class="s2">&#34;.;&#34;</span><span class="p">)</span>
<span class="kr">end</span>
</code></pre></div><p>You&rsquo;ll notice the <code>find_file</code> usage, which is just a wrapper around <code>findfile</code>
that returns <code>nil</code> if it doesn&rsquo;t find one (empty strings are not falsy in Lua):</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lua" data-lang="lua"><span class="kd">local</span> <span class="kr">function</span> <span class="nf">find_file</span><span class="p">(</span><span class="n">fname</span><span class="p">,</span> <span class="n">path</span><span class="p">)</span>
  <span class="kd">local</span> <span class="n">found</span> <span class="o">=</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">findfile</span><span class="p">(</span><span class="n">fname</span><span class="p">,</span> <span class="n">path</span> <span class="ow">or</span> <span class="s2">&#34;&#34;</span><span class="p">)</span>
  <span class="kr">if</span> <span class="n">found</span> <span class="o">~=</span> <span class="s2">&#34;&#34;</span> <span class="kr">then</span>
    <span class="kr">return</span> <span class="n">found</span>
  <span class="kr">end</span>
<span class="kr">end</span>
</code></pre></div><p>I use a similar function called <code>find_dir</code> that wraps <code>:h finddir</code>.</p>
<h2>
  Reading JSON with comments
</h2>
<p>We also need to read the <code>tsconfig.json</code> file. Vim has a function to serialize
JSON, <a href="https://vimhelp.org/eval.txt.html#json_decode%28%29"><code>:h json_decode</code></a>,
which is great, except that <code>tsconfig.json</code> is not strictly JSON, since it
allows comments. No problem, we can just remove them before we pass it to
<code>json_decode</code>:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lua" data-lang="lua"><span class="kd">local</span> <span class="kr">function</span> <span class="nf">remove_comments</span><span class="p">(</span><span class="n">line</span><span class="p">)</span>
  <span class="kr">return</span> <span class="n">line</span><span class="p">:</span><span class="n">gsub</span><span class="p">(</span><span class="s2">&#34;/%*.*%*/&#34;</span><span class="p">,</span> <span class="s2">&#34;&#34;</span><span class="p">):</span><span class="n">gsub</span><span class="p">(</span><span class="s2">&#34;//.*&#34;</span><span class="p">,</span> <span class="s2">&#34;&#34;</span><span class="p">)</span>
<span class="kr">end</span>

<span class="kd">local</span> <span class="kr">function</span> <span class="nf">decode_json_with_comments</span><span class="p">(</span><span class="n">fname</span><span class="p">)</span>
  <span class="kd">local</span> <span class="n">json_without_comments</span> <span class="o">=</span> <span class="n">vim.tbl_map</span><span class="p">(</span><span class="n">remove_comments</span><span class="p">,</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">readfile</span><span class="p">(</span><span class="n">fname</span><span class="p">))</span>
  <span class="kr">return</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">json_decode</span><span class="p">(</span><span class="n">json_without_comments</span><span class="p">)</span>
<span class="kr">end</span>
</code></pre></div><h2>
  Parsing <code>compilerOptions.paths</code>
</h2>
<p>Next step is to parse <code>compilerOptions.paths</code> to create a table that maps
aliases into their full paths. For example, given this configuration:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-json" data-lang="json"><span class="p">{</span>
  <span class="nt">&#34;compilerOptions&#34;</span><span class="p">:</span> <span class="p">{</span>
    <span class="nt">&#34;baseUrl&#34;</span><span class="p">:</span> <span class="s2">&#34;.&#34;</span><span class="p">,</span>
    <span class="nt">&#34;paths&#34;</span><span class="p">:</span> <span class="p">{</span>
      <span class="nt">&#34;~/*&#34;</span><span class="p">:</span> <span class="p">[</span><span class="s2">&#34;src/*&#34;</span><span class="p">]</span>
    <span class="p">}</span>
  <span class="p">}</span>
<span class="p">}</span>
</code></pre></div><p>We want something like this:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lua" data-lang="lua"><span class="p">{</span>
  <span class="s2">&#34;~/*&#34;</span><span class="p">:</span> <span class="p">{</span>
    <span class="n">get_full_path</span><span class="p">(</span><span class="n">base_url</span><span class="p">)</span> <span class="o">..</span> <span class="s2">&#34;src/&#34;</span>
  <span class="p">}</span>
<span class="p">}</span>
</code></pre></div><p>This is because paths are relative to <code>compilerOptions.baseUrl</code>. Also, we
should remove the catch-all character <code>*</code>:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lua" data-lang="lua"><span class="kd">local</span> <span class="kr">function</span> <span class="nf">get_dir</span><span class="p">(</span><span class="n">fname</span><span class="p">)</span>
  <span class="kr">return</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">fnamemodify</span><span class="p">(</span><span class="n">fname</span><span class="p">,</span> <span class="s2">&#34;:h&#34;</span><span class="p">)</span>
<span class="kr">end</span>

<span class="kd">local</span> <span class="kr">function</span> <span class="nf">get_tsconfig_paths</span><span class="p">(</span><span class="n">tsconfig_fname</span><span class="p">)</span>
  <span class="kr">if</span> <span class="ow">not</span> <span class="n">tsconfig_fname</span> <span class="kr">then</span>
    <span class="kr">return</span> <span class="p">{}</span>
  <span class="kr">end</span>

  <span class="kd">local</span> <span class="n">json</span> <span class="o">=</span> <span class="n">decode_json_with_comments</span><span class="p">(</span><span class="n">tsconfig_fname</span><span class="p">)</span>
  <span class="kd">local</span> <span class="n">base_url</span> <span class="o">=</span> <span class="n">json</span> <span class="ow">and</span> <span class="n">json.compilerOptions</span> <span class="ow">and</span> <span class="n">json.compilerOptions</span><span class="p">.</span><span class="n">baseUrl</span>

  <span class="kd">local</span> <span class="n">alias</span><span class="o">-</span><span class="n">to_paths</span> <span class="o">=</span> <span class="p">{}</span>

  <span class="kr">if</span> <span class="n">json</span> <span class="ow">and</span> <span class="n">json.compilerOptions</span> <span class="ow">and</span> <span class="n">json.compilerOptions</span><span class="p">.</span><span class="n">paths</span> <span class="kr">then</span>
    <span class="kr">for</span> <span class="n">alias</span><span class="p">,</span> <span class="n">paths</span> <span class="kr">in</span> <span class="n">pairs</span><span class="p">(</span><span class="n">json.compilerOptions</span><span class="p">.</span><span class="n">paths</span><span class="p">)</span> <span class="kr">do</span>
      <span class="n">alias_to_paths</span><span class="p">[</span><span class="n">alias</span><span class="p">]</span> <span class="o">=</span>
        <span class="n">vim.tbl_map</span><span class="p">(</span>
        <span class="kr">function</span><span class="p">(</span><span class="n">path</span><span class="p">)</span>
<span class="hl">          <span class="kr">return</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">simplify</span><span class="p">(</span><span class="n">get_dir</span><span class="p">(</span><span class="n">tsconfig_fname</span><span class="p">)</span> <span class="o">..</span> <span class="s2">&#34;/&#34;</span> <span class="o">..</span> <span class="n">base_url</span> <span class="o">..</span> <span class="s2">&#34;/&#34;</span> <span class="o">..</span> <span class="n">path</span><span class="p">:</span><span class="n">gsub</span><span class="p">(</span><span class="s2">&#34;*&#34;</span><span class="p">,</span> <span class="s2">&#34;&#34;</span><span class="p">))</span>
</span>        <span class="kr">end</span><span class="p">,</span>
        <span class="n">paths</span>
      <span class="p">)</span>
    <span class="kr">end</span>
  <span class="kr">end</span>

  <span class="kr">return</span> <span class="n">alias_to_paths</span>
<span class="kr">end</span>
</code></pre></div><h2>
  Expand tsconfig
</h2>
<p>Now let&rsquo;s remove that TODO we left earlier.</p>
<p>We just need to &ldquo;expand&rdquo; (replace) the alias with its path until we find a file
that exist.</p>
<p>First, we check if the input filename matches the alias (e.g., <code>~/file</code> should
match <code>~/*</code> but also <code>*</code> since it means any value), replace the alias with its
path (<code>~/file</code> -&gt; <code>src/file</code>) and try to find it:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lua" data-lang="lua"><span class="kd">local</span> <span class="kr">function</span> <span class="nf">expand_tsconfig_path</span><span class="p">(</span><span class="n">input</span><span class="p">)</span>
  <span class="c1">-- ...</span>

  <span class="kr">for</span> <span class="n">alias</span><span class="p">,</span> <span class="n">paths</span> <span class="kr">in</span> <span class="n">pairs</span><span class="p">(</span><span class="n">alias_to_paths</span><span class="p">)</span> <span class="kr">do</span>
<span class="hl">    <span class="kr">if</span> <span class="n">alias</span> <span class="o">==</span> <span class="s2">&#34;*&#34;</span> <span class="ow">or</span> <span class="n">vim.startswith</span><span class="p">(</span><span class="n">input</span><span class="p">,</span> <span class="n">alias</span><span class="p">:</span><span class="n">gsub</span><span class="p">(</span><span class="s2">&#34;*&#34;</span><span class="p">,</span> <span class="s2">&#34;&#34;</span><span class="p">))</span> <span class="kr">then</span>
</span>      <span class="kr">for</span> <span class="n">_</span><span class="p">,</span> <span class="n">path</span> <span class="kr">in</span> <span class="n">pairs</span><span class="p">(</span><span class="n">paths</span><span class="p">)</span> <span class="kr">do</span>
<span class="hl">        <span class="kd">local</span> <span class="n">expanded_path</span> <span class="o">=</span> <span class="n">input</span><span class="p">:</span><span class="n">gsub</span><span class="p">(</span><span class="n">alias</span><span class="p">,</span> <span class="n">path</span><span class="p">)</span>
</span><span class="hl">        <span class="kd">local</span> <span class="n">real_path</span> <span class="o">=</span> <span class="n">find_file</span><span class="p">(</span><span class="n">expanded_path</span><span class="p">)</span> <span class="ow">or</span> <span class="n">find_dir</span><span class="p">(</span><span class="n">expanded_path</span><span class="p">)</span>
</span>
        <span class="kr">if</span> <span class="n">real_path</span> <span class="kr">then</span>
          <span class="kr">return</span> <span class="n">real_path</span>
        <span class="kr">end</span>
      <span class="kr">end</span>
    <span class="kr">end</span>
  <span class="kr">end</span>

  <span class="kr">return</span> <span class="n">input</span>
<span class="kr">end</span>
</code></pre></div><h2>
  Handling configuration inheritance
</h2>
<p>One problem though&hellip; We&rsquo;re ignoring TS Config&rsquo;s
<a href="https://www.typescriptlang.org/tsconfig#extends"><code>extends</code></a> option, which
allows you to inherit from other configuration files.</p>
<p>If a <code>tsconfig.json</code> inherits from another configuration, our algorithm as it
is now just ignores these other configurations completely.</p>
<p>To handle this, we&rsquo;ll need to recursively call <code>get_tsconfig_paths</code> for every
<code>tsconfig.json</code> that has an <code>extends</code> option, until it doesn&rsquo;t:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lua" data-lang="lua"><span class="kd">local</span> <span class="kr">function</span> <span class="nf">find_tsconfig_extends</span><span class="p">(</span><span class="n">extends</span><span class="p">,</span> <span class="n">tsconfig_fname</span><span class="p">)</span>
  <span class="kr">if</span> <span class="ow">not</span> <span class="n">extends</span> <span class="ow">or</span> <span class="n">vim.startswith</span><span class="p">(</span><span class="n">extends</span><span class="p">,</span> <span class="s2">&#34;@&#34;</span><span class="p">)</span> <span class="kr">then</span>
    <span class="kr">return</span>
  <span class="kr">end</span>

  <span class="kd">local</span> <span class="n">tsconfig_dir</span> <span class="o">=</span> <span class="n">get_dir</span><span class="p">(</span><span class="n">tsconfig_fname</span><span class="p">)</span>
  <span class="kr">return</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">simplify</span><span class="p">(</span><span class="n">tsconfig_dir</span> <span class="o">..</span> <span class="s2">&#34;/&#34;</span> <span class="o">..</span> <span class="n">extends</span><span class="p">)</span>
<span class="kr">end</span>

<span class="hl"><span class="kd">local</span> <span class="kr">function</span> <span class="nf">get_tsconfig_paths</span><span class="p">(</span><span class="n">tsconfig_fname</span><span class="p">,</span> <span class="n">prev_base_url</span><span class="p">)</span>
</span>  <span class="kr">if</span> <span class="ow">not</span> <span class="n">tsconfig_fname</span> <span class="kr">then</span>
    <span class="kr">return</span> <span class="p">{}</span>
  <span class="kr">end</span>

  <span class="kd">local</span> <span class="n">json</span> <span class="o">=</span> <span class="n">decode_json_with_comments</span><span class="p">(</span><span class="n">tsconfig_fname</span><span class="p">)</span>
<span class="hl">  <span class="kd">local</span> <span class="n">base_url</span> <span class="o">=</span> <span class="n">json</span> <span class="ow">and</span> <span class="n">json.compilerOptions</span> <span class="ow">and</span> <span class="n">json.compilerOptions</span><span class="p">.</span><span class="n">baseUrl</span> <span class="ow">or</span> <span class="n">prev_base_url</span>
</span>
  <span class="kd">local</span> <span class="n">alias_to_paths</span> <span class="o">=</span> <span class="p">{}</span>

  <span class="c1">-- ...</span>

<span class="hl">  <span class="kd">local</span> <span class="n">tsconfig_extends</span> <span class="o">=</span> <span class="n">find_tsconfig_extends</span><span class="p">(</span><span class="n">json.extends</span><span class="p">,</span> <span class="n">get_dir</span><span class="p">(</span><span class="n">tsconfig_fname</span><span class="p">))</span>
</span><span class="hl">
</span><span class="hl">  <span class="kr">return</span> <span class="n">vim.tbl_extend</span><span class="p">(</span><span class="s2">&#34;force&#34;</span><span class="p">,</span> <span class="n">alias_to_paths</span><span class="p">,</span> <span class="n">get_tsconfig_paths</span><span class="p">(</span><span class="n">tsconfig_extends</span><span class="p">,</span> <span class="n">base_url</span><span class="p">))</span>
</span><span class="kr">end</span>
</code></pre></div><h1>
  Conclusion
</h1>
<p><a href="https://github.com/phelipetls/dotfiles/blob/84303bfdf877d1ded6b8287f83806ebb73af1cce/.config/nvim/lua/tsconfig.lua">You can check the full implementation
here</a>.
Be aware that this will likely change.</p>
<p>As I said earlier, Vim&rsquo;s built-in file navigation features are not the best
tool for the job but it does help me when tsserver/coc.nvim/watchman are being
slow, unreliable or making my computer fans go crazy.</p>
<p>Vim support for go-to-definition functionality <a href="https://vimways.org/2018/death-by-a-thousand-files/">does not stop at the
<code>includeexpr</code> option</a>, but
the API is cumbersome to use. I tried to get go-to-defintion working for
TypeScript by using <code>:h include-search</code> but had a hard time and eventually gave
up (the <code>v:fname</code> API is not enough for nested imports), but it&rsquo;s nice to have
a working <code>gf</code> at least&hellip; It&rsquo;s also a good idea to <a href="https://github.com/tpope/vim-apathy/blame/master/after/ftplugin/javascript_apathy.vim">check out what the
vim-apathy plugin does for
JavaScript</a>
if you want to dive more deep into it.</p>

