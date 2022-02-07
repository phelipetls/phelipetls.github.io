# [Configuring eslint to work with Neovim LSP](https://phelipetls.github.io/posts/configuring-eslint-to-work-with-neovim-lsp/)

December 28, 2020 · 2 min. read time

---

<p>The way we&rsquo;ll get this to work is by using a generic Language Server called
<a href="https://github.com/mattn/efm-langserver"><code>efm-langserver</code></a>, which is written in
Go.</p>
<p>These Language Servers are generic in that they were made to be powered by
command-line tools and for any programming language.</p>
<h1>
  Making eslint faster with eslint_d
</h1>
<p>To reduce latency when invoking <code>eslint</code>, I&rsquo;m gonna use
<a href="https://github.com/mantoni/eslint_d.js/"><code>eslint_d</code></a>, which runs <code>eslint</code> as a
daemon process.</p>
<h1>
  Configuring eslint_d in efm-langserver
</h1>
<p>It&rsquo;s possible to configure it with a YAML file, by following their README. I did
this initially I found that it&rsquo;s more powerful to configure it with Lua.</p>
<p>Here&rsquo;s the configuration, which more explanation below.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lua" data-lang="lua"><span class="kd">local</span> <span class="n">lspconfig</span> <span class="o">=</span> <span class="n">require</span><span class="s2">&#34;lspconfig&#34;</span>

<span class="kd">local</span> <span class="n">eslint</span> <span class="o">=</span> <span class="p">{</span>
  <span class="n">lintCommand</span> <span class="o">=</span> <span class="s2">&#34;eslint_d -f unix --stdin --stdin-filename ${INPUT}&#34;</span><span class="p">,</span>
  <span class="n">lintStdin</span> <span class="o">=</span> <span class="kc">true</span><span class="p">,</span>
  <span class="n">lintFormats</span> <span class="o">=</span> <span class="p">{</span><span class="s2">&#34;%f:%l:%c: %m&#34;</span><span class="p">},</span>
  <span class="n">lintIgnoreExitCode</span> <span class="o">=</span> <span class="kc">true</span><span class="p">,</span>
  <span class="n">formatCommand</span> <span class="o">=</span> <span class="s2">&#34;eslint_d --fix-to-stdout --stdin --stdin-filename=${INPUT}&#34;</span><span class="p">,</span>
  <span class="n">formatStdin</span> <span class="o">=</span> <span class="kc">true</span>
<span class="p">}</span>

<span class="n">lspconfig.tsserver</span><span class="p">.</span><span class="n">setup</span> <span class="p">{</span>
  <span class="n">on_attach</span> <span class="o">=</span> <span class="kr">function</span><span class="p">(</span><span class="n">client</span><span class="p">)</span>
    <span class="kr">if</span> <span class="n">client.config</span><span class="p">.</span><span class="n">flags</span> <span class="kr">then</span>
      <span class="n">client.config</span><span class="p">.</span><span class="n">flags.allow_incremental_sync</span> <span class="o">=</span> <span class="kc">true</span>
    <span class="kr">end</span>
    <span class="n">client.resolved_capabilities</span><span class="p">.</span><span class="n">document_formatting</span> <span class="o">=</span> <span class="kc">false</span>
    <span class="n">set_lsp_config</span><span class="p">(</span><span class="n">client</span><span class="p">)</span>
  <span class="kr">end</span>
<span class="p">}</span>

<span class="n">lspconfig.efm</span><span class="p">.</span><span class="n">setup</span> <span class="p">{</span>
  <span class="n">on_attach</span> <span class="o">=</span> <span class="kr">function</span><span class="p">(</span><span class="n">client</span><span class="p">)</span>
    <span class="n">client.resolved_capabilities</span><span class="p">.</span><span class="n">document_formatting</span> <span class="o">=</span> <span class="kc">true</span>
    <span class="n">client.resolved_capabilities</span><span class="p">.</span><span class="n">goto_definition</span> <span class="o">=</span> <span class="kc">false</span>
    <span class="n">set_lsp_config</span><span class="p">(</span><span class="n">client</span><span class="p">)</span>
  <span class="kr">end</span><span class="p">,</span>
  <span class="n">root_dir</span> <span class="o">=</span> <span class="kr">function</span><span class="p">()</span>
    <span class="kr">if</span> <span class="ow">not</span> <span class="n">eslint_config_exists</span><span class="p">()</span> <span class="kr">then</span>
      <span class="kr">return</span> <span class="kc">nil</span>
    <span class="kr">end</span>
    <span class="kr">return</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">getcwd</span><span class="p">()</span>
  <span class="kr">end</span><span class="p">,</span>
  <span class="n">settings</span> <span class="o">=</span> <span class="p">{</span>
    <span class="n">languages</span> <span class="o">=</span> <span class="p">{</span>
      <span class="n">javascript</span> <span class="o">=</span> <span class="p">{</span><span class="n">eslint</span><span class="p">},</span>
      <span class="n">javascriptreact</span> <span class="o">=</span> <span class="p">{</span><span class="n">eslint</span><span class="p">},</span>
      <span class="p">[</span><span class="s2">&#34;javascript.jsx&#34;</span><span class="p">]</span> <span class="o">=</span> <span class="p">{</span><span class="n">eslint</span><span class="p">},</span>
      <span class="n">typescript</span> <span class="o">=</span> <span class="p">{</span><span class="n">eslint</span><span class="p">},</span>
      <span class="p">[</span><span class="s2">&#34;typescript.tsx&#34;</span><span class="p">]</span> <span class="o">=</span> <span class="p">{</span><span class="n">eslint</span><span class="p">},</span>
      <span class="n">typescriptreact</span> <span class="o">=</span> <span class="p">{</span><span class="n">eslint</span><span class="p">}</span>
    <span class="p">}</span>
  <span class="p">},</span>
  <span class="n">filetypes</span> <span class="o">=</span> <span class="p">{</span>
    <span class="s2">&#34;javascript&#34;</span><span class="p">,</span>
    <span class="s2">&#34;javascriptreact&#34;</span><span class="p">,</span>
    <span class="s2">&#34;javascript.jsx&#34;</span><span class="p">,</span>
    <span class="s2">&#34;typescript&#34;</span><span class="p">,</span>
    <span class="s2">&#34;typescript.tsx&#34;</span><span class="p">,</span>
    <span class="s2">&#34;typescriptreact&#34;</span>
  <span class="p">},</span>
<span class="p">}</span>
</code></pre></div><p>I defined a table to configure <code>efm-langserver</code> with <code>eslint_d</code> by giving the
necessary commands for linting and formatting.</p>
<p>I customize the <code>on_attach</code> function of both <code>efm</code> and <code>tsserver</code> so that only
one has <code>documentFormatting</code> capability, otherwise they would conflict with each
other.</p>
<p>The <code>root_dir</code> function was also customized so that <code>eslint_d</code> is spawned just
for the current working directory and not for every directory it encounters a
<code>.eslintrc</code> (or similar).</p>
<p>But I also want this to happen only if the directory has some sort of <code>eslint</code>
configuration. So I created a function to do this:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-lua" data-lang="lua"><span class="kd">local</span> <span class="kr">function</span> <span class="nf">eslint_config_exists</span><span class="p">()</span>
  <span class="kd">local</span> <span class="n">eslintrc</span> <span class="o">=</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">glob</span><span class="p">(</span><span class="s2">&#34;.eslintrc*&#34;</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>

  <span class="kr">if</span> <span class="ow">not</span> <span class="n">vim.tbl_isempty</span><span class="p">(</span><span class="n">eslintrc</span><span class="p">)</span> <span class="kr">then</span>
    <span class="kr">return</span> <span class="kc">true</span>
  <span class="kr">end</span>

  <span class="kr">if</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">filereadable</span><span class="p">(</span><span class="s2">&#34;package.json&#34;</span><span class="p">)</span> <span class="kr">then</span>
    <span class="kr">if</span> <span class="n">vim.fn</span><span class="p">.</span><span class="n">json_decode</span><span class="p">(</span><span class="n">vim.fn</span><span class="p">.</span><span class="n">readfile</span><span class="p">(</span><span class="s2">&#34;package.json&#34;</span><span class="p">))[</span><span class="s2">&#34;eslintConfig&#34;</span><span class="p">]</span> <span class="kr">then</span>
      <span class="kr">return</span> <span class="kc">true</span>
    <span class="kr">end</span>
  <span class="kr">end</span>

  <span class="kr">return</span> <span class="kc">false</span>
<span class="kr">end</span>
</code></pre></div><h1>
  Conclusion
</h1>
<p>This is kind like a poor replacement for the VS Code eslint extension, which
does a similar thing as <code>eslint_d</code>. And it works ok, it&rsquo;s pretty fast, much
faster than <code>typescript-language-server</code>, so it&rsquo;s definitely an improvement.</p>
<p>It would be nice if there was a way to shut down the server if <code>eslint</code> is
broken for example, but I didn&rsquo;t manage to do it just yet.</p>

