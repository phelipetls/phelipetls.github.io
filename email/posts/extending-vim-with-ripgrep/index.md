# [Extending Vim with ripgrep](https://phelipetls.github.io/posts/extending-vim-with-ripgrep/)

June 11, 2021 · 2 min. read time

---

<p>In this post I want to talk about how I use <code>ripgrep</code> in <code>vim</code> (<code>nvim</code> to me
but it doesn&rsquo;t matter here).</p>
<p>This is a crucial part of my daily workflow. It&rsquo;s fast because of <code>ripgrep</code> and
extensible because of how nicely <code>vim</code> is integrated with the command line.</p>
<p>Here&rsquo;s the configuration needed:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vim" data-lang="vim"><span class="k">if</span> <span class="nx">executable</span><span class="p">(</span><span class="s2">&#34;rg&#34;</span><span class="p">)</span><span class="err">
</span><span class="err"></span>  <span class="nx">set</span> <span class="nx">grepprg</span><span class="p">=</span><span class="nx">rg</span>\ <span class="p">--</span><span class="nx">vimgrep</span>\ <span class="p">--</span><span class="nx">smart</span><span class="p">-</span><span class="nx">case</span>\ <span class="p">--</span><span class="nx">hidden</span><span class="err">
</span><span class="err"></span>  <span class="nx">set</span> <span class="nx">grepformat</span><span class="p">=</span>%<span class="nx">f</span>:%<span class="nx">l</span>:%<span class="nx">c</span>:%<span class="nx">m</span><span class="err">
</span><span class="err"></span><span class="k">endif</span><span class="err">
</span></code></pre></div><p>At first, it was not obvious to me how I could use it beyond <code>:grep foo</code>, so I
want to share how I do.</p>
<h1>
  Common use cases
</h1>
<ul>
<li>Search for <code>foo</code> in current working directory: <code>:grep foo</code>.</li>
<li>Search for <code>foo</code> in files under <code>src/</code>: <code>:grep foo src</code>.</li>
<li>Search for <code>foo</code> in current file directory: <code>:grep foo %:h</code><sup id="fnref:1"><a href="#fn:1" class="footnote-ref" role="doc-noteref">1</a></sup>.</li>
<li>Search for <code>foo</code> in current file directory&rsquo;s parent directory: <code>:grep foo %:h:h</code> (and so on).</li>
</ul>
<h1>
  Less common use cases
</h1>
<ul>
<li>Search for the exact word <code>foo</code> (not <code>foobar</code>): <code>:grep -w foo</code> (equivalent to
<code>:grep '\bfoo\b'</code>).</li>
<li>Search for <code>foo</code> in JavaScript files: <code>:grep foo -t js</code></li>
<li>Search for <code>foo</code> in files matching a glob: <code>:grep foo -g '*.js'</code></li>
</ul>
<h1>
  Extensibility
</h1>
<p>This is nice but here is where it truly shines. I can give any command line
output as an argument.</p>
<p>Say I want to search in files modified between git revisions:</p>
<pre tabindex="0"><code>:grep foo `git diff --name-only master..`
</code></pre><p>Or only modified files:</p>
<pre tabindex="0"><code>:grep foo `git ls-files --modified`
</code></pre><p>I don&rsquo;t use this everyday but I enjoy it when I do.</p>
<h1>
  Usage with Vim
</h1>
<p>This will populate the quickfix list with the search results, so I can navigate
them with commands I&rsquo;m already familiar with.</p>
<p>For example, to replace foo with bar across files (asking me to confirm
before): <code>:cdo s/foo/bar/gc</code>. And then <code>:cfdo update</code>. Sometimes I narrow the
search down with <code>:Cfilter</code> too.</p>
<h1>
  Downsides
</h1>
<p><s>A downside is that you can&rsquo;t use backreferences or look-around in regex. In
the rare case I need them, I use <code>:vimgrep</code>.</s> I just find out, <a href="https://www.reddit.com/r/neovim/comments/nyb8am/extending_vim_with_ripgrep/h2403y3?utm_source=share&amp;utm_medium=web2x&amp;context=3">thanks to
ripgrep&rsquo;s
author</a>,
that you can use backreferences/look-around in regex with the <code>-P/--pcre2</code> flag
or <code>--engine auto</code> and I can&rsquo;t wait to use it!!</p>
<p>Another one is that it&rsquo;s synchronous, so if the directory is huge it may block <code>vim</code>
for a few seconds. But I don&rsquo;t usually experience this because of how fast
<code>ripgrep</code> is.</p>
<h1>
  Conclusion
</h1>
<p>This might be one of the few sane reasons why I insist on using <code>nvim</code> for
development (<code>vim-fugitive</code> and LSP as well). It&rsquo;s just one of those things I
enjoy using and makes development more fun (to me).</p>
<section class="footnotes" role="doc-endnotes">
<hr>
<ol>
<li id="fn:1" role="doc-endnote">
<p><code>%:h</code> is expanded by <code>vim</code> to get the header of the current file. See <code>:h expand</code>.&#160;<a href="#fnref:1" class="footnote-backref" role="doc-backlink">&#x21a9;&#xfe0e;</a></p>
</li>
</ol>
</section>

