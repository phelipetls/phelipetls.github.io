# [Implementing dark mode for static websites](https://phelipetls.github.io/posts/implementing-dark-mode-for-static-websites/)

April 29, 2021 · 4 min. read time

---

<p>Implementing dark mode for a static website is not as simple as you may
initially think. There are some hacky things we should do to provide the best
experience and avoid things like <a href="https://css-tricks.com/flash-of-inaccurate-color-theme-fart/">flash of incorrect
theme</a> on reload,
handling transitions, persistence etc.</p>
<p>In this blog post I&rsquo;ll dive into the implementation details on how to make it
work in general and then on how to implement it in Hugo-powered websites.</p>
<h1>
  CSS
</h1>
<p>CSS variables makes it very easy to define which colors you&rsquo;ll use for dark or
light mode:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-css" data-lang="css"><span class="p">:</span><span class="nd">root</span> <span class="p">{</span>
  <span class="nv">--black</span><span class="p">:</span> <span class="mh">#000000</span><span class="p">;</span>
  <span class="nv">--white</span><span class="p">:</span> <span class="mh">#ffffff</span><span class="p">;</span>
<span class="p">}</span>

<span class="nt">body</span><span class="o">[</span><span class="nt">data-theme</span><span class="o">=</span><span class="s2">&#34;light&#34;</span><span class="o">]</span> <span class="p">{</span>
  <span class="nv">--bg-color</span><span class="p">:</span> <span class="nf">var</span><span class="p">(</span><span class="o">--</span><span class="kc">white</span><span class="p">);</span>
  <span class="nv">--fg-color</span><span class="p">:</span> <span class="nf">var</span><span class="p">(</span><span class="o">--</span><span class="kc">black</span><span class="p">);</span>
<span class="p">}</span>

<span class="nt">body</span><span class="o">[</span><span class="nt">data-theme</span><span class="o">=</span><span class="s2">&#34;dark&#34;</span><span class="o">]</span> <span class="p">{</span>
  <span class="nv">--bg-color</span><span class="p">:</span> <span class="nf">var</span><span class="p">(</span><span class="o">--</span><span class="kc">black</span><span class="p">);</span>
  <span class="nv">--fg-color</span><span class="p">:</span> <span class="nf">var</span><span class="p">(</span><span class="o">--</span><span class="kc">white</span><span class="p">);</span>
<span class="p">}</span>
</code></pre></div><p>And that&rsquo;s it.</p>
<p>To toggle from one theme to another we just need some JavaScript:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="kr">const</span> <span class="nx">button</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s2">&#34;button.theme-toggler&#34;</span><span class="p">);</span>

<span class="nx">button</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&#34;click&#34;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="k">if</span> <span class="p">(</span><span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">dataset</span><span class="p">.</span><span class="nx">theme</span> <span class="o">===</span> <span class="s2">&#34;dark&#34;</span><span class="p">)</span> <span class="p">{</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">setAttribute</span><span class="p">(</span><span class="s2">&#34;data-theme&#34;</span><span class="p">,</span> <span class="s2">&#34;light&#34;</span><span class="p">);</span>
    <span class="k">return</span><span class="p">;</span>
  <span class="p">}</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">setAttribute</span><span class="p">(</span><span class="s2">&#34;data-theme&#34;</span><span class="p">,</span> <span class="s2">&#34;dark&#34;</span><span class="p">);</span>
<span class="p">});</span>
</code></pre></div><h1>
  Theme persistence
</h1>
<p>To make the theme persist, we&rsquo;ll use
<a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"><code>localStorage</code></a>.</p>
<p>Every time the theme changes, we save it to <code>localStorage</code>. When the page
reloads, we read from <code>localStorage</code> and change the theme:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="kr">const</span> <span class="nx">storedTheme</span> <span class="o">=</span> <span class="nx">localStorage</span><span class="p">.</span><span class="nx">getItem</span><span class="p">(</span><span class="s2">&#34;__theme&#34;</span><span class="p">);</span>

<span class="k">if</span> <span class="p">(</span><span class="nx">storedTheme</span><span class="p">)</span> <span class="p">{</span>
  <span class="cm">/* Change theme to storedTheme */</span>
<span class="p">}</span>

<span class="kr">const</span> <span class="nx">button</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s2">&#34;button.theme-switcher&#34;</span><span class="p">);</span>

<span class="nx">button</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&#34;click&#34;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="cm">/* Toggle theme */</span>
<span class="p">});</span>
</code></pre></div><p>We just need to put this in a <code>script</code> tag at the end of the <code>body</code> tag to make
it work!&hellip; except the page will flash on reload.</p>
<p>This is because, at the time the script runs, the page has already been drawn in
light mode, and just then we change it to dark mode.</p>
<p>The fix is to set the theme from <code>localStorage</code> <em>as early as possible</em>. But this
also means that we won&rsquo;t be able to add an event listener to the button because
it has yet to be created:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-html" data-lang="html"><span class="p">&lt;</span><span class="nt">body</span> <span class="na">data-theme</span><span class="o">=</span><span class="s">&#34;light&#34;</span><span class="p">&gt;</span>
  <span class="p">&lt;</span><span class="nt">script</span><span class="p">&gt;</span>
    <span class="c">&lt;!--</span> <span class="nx">load</span> <span class="nx">theme</span> <span class="nx">from</span> <span class="nx">localStorage</span> <span class="o">--&gt;</span>
  <span class="p">&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>

  ...

  <span class="p">&lt;</span><span class="nt">button</span><span class="p">&gt;</span>Change theme<span class="p">&lt;/</span><span class="nt">button</span><span class="p">&gt;</span>

  <span class="p">&lt;</span><span class="nt">script</span><span class="p">&gt;</span>
    <span class="c">&lt;!--</span> <span class="nx">add</span> <span class="nx">button</span> <span class="nx">logic</span> <span class="o">--&gt;</span>
  <span class="p">&lt;/</span><span class="nt">script</span><span class="p">&gt;</span>
<span class="p">&lt;/</span><span class="nt">body</span><span class="p">&gt;</span>
</code></pre></div><p>But that way we won&rsquo;t be able to share logic between scripts unless (here comes
the hack) we use a global variable.</p>
<p>In the first script, right after the body tag, we set the theme from
<code>localStorage</code>.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="nb">window</span><span class="p">.</span><span class="mi">__</span><span class="nx">setTheme</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">newTheme</span><span class="p">)</span> <span class="p">{</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">setAttribute</span><span class="p">(</span><span class="s2">&#34;data-theme&#34;</span><span class="p">,</span> <span class="nx">newTheme</span><span class="p">);</span>
  <span class="nx">localStorage</span><span class="p">.</span><span class="nx">setItem</span><span class="p">(</span><span class="s2">&#34;__theme&#34;</span><span class="p">,</span> <span class="nx">newTheme</span><span class="p">);</span>
  <span class="c1">// More logic...
</span><span class="c1"></span><span class="p">};</span>

<span class="kr">const</span> <span class="nx">storedTheme</span> <span class="o">=</span> <span class="nx">localStorage</span><span class="p">.</span><span class="nx">getItem</span><span class="p">(</span><span class="s2">&#34;__theme&#34;</span><span class="p">);</span>

<span class="k">if</span> <span class="p">(</span><span class="nx">storedTheme</span><span class="p">)</span> <span class="p">{</span>
  <span class="nb">window</span><span class="p">.</span><span class="mi">__</span><span class="nx">setTheme</span><span class="p">(</span><span class="nx">storedTheme</span><span class="p">);</span>
<span class="p">}</span>
</code></pre></div><p>Then we make the button change the theme:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="kr">const</span> <span class="nx">button</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s2">&#34;button.theme-toggler&#34;</span><span class="p">);</span>

<span class="nx">button</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&#34;click&#34;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="k">if</span> <span class="p">(</span><span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">dataset</span><span class="p">.</span><span class="nx">theme</span> <span class="o">===</span> <span class="s2">&#34;dark&#34;</span><span class="p">)</span> <span class="p">{</span>
    <span class="nb">window</span><span class="p">.</span><span class="mi">__</span><span class="nx">setTheme</span><span class="p">(</span><span class="s2">&#34;light&#34;</span><span class="p">);</span>
    <span class="k">return</span><span class="p">;</span>
  <span class="p">}</span>
  <span class="nb">window</span><span class="p">.</span><span class="mi">__</span><span class="nx">setTheme</span><span class="p">(</span><span class="s2">&#34;dark&#34;</span><span class="p">);</span>
<span class="p">});</span>
</code></pre></div><section data-note class="flex my-8 gap-4 p-4 border-2 rounded border-note">
  <div class="text-note">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
  <circle cx="12" cy="12" r="10"/>
  <line x1="12" y1="16" x2="12" y2="12"/>
  <line x1="12" y1="8" x2="12.01" y2="8"/>
</svg>

  </div>

  <div>
    The script tag <em>has</em> to be inline, otherwise the flash will still
happen.
  </div>
</section>

<h1>
  Transition between themes
</h1>
<p>This works, but we want some animations:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-css" data-lang="css"><span class="nt">body</span> <span class="p">{</span>
  <span class="k">transition</span><span class="p">:</span> <span class="kc">color</span> <span class="mf">0.25</span><span class="kt">s</span> <span class="kc">ease-out</span><span class="p">,</span> <span class="k">background</span> <span class="mf">0.25</span><span class="kt">s</span> <span class="kc">ease-out</span><span class="p">;</span>
<span class="p">}</span>
</code></pre></div><p>Now you reload the page and things are broken again, because the transition will
happen on reload.
<a href="https://css-tricks.com/transitions-only-after-page-load/">To prevent this, I used this trick from CSS-Tricks:</a></p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-html" data-lang="html"><span class="p">&lt;</span><span class="nt">body</span> <span class="na">class</span><span class="o">=</span><span class="s">&#34;preload&#34;</span><span class="p">&gt;&lt;/</span><span class="nt">body</span><span class="p">&gt;</span>
</code></pre></div><div class="highlight"><pre tabindex="0" class="chroma"><code class="language-css" data-lang="css"><span class="p">.</span><span class="nc">preload</span> <span class="p">{</span>
  <span class="kp">-webkit-</span><span class="k">transition</span><span class="p">:</span> <span class="kc">none</span> <span class="cp">!important</span><span class="p">;</span>
  <span class="kp">-moz-</span><span class="k">transition</span><span class="p">:</span> <span class="kc">none</span> <span class="cp">!important</span><span class="p">;</span>
  <span class="kp">-ms-</span><span class="k">transition</span><span class="p">:</span> <span class="kc">none</span> <span class="cp">!important</span><span class="p">;</span>
  <span class="kp">-o-</span><span class="k">transition</span><span class="p">:</span> <span class="kc">none</span> <span class="cp">!important</span><span class="p">;</span>
<span class="p">}</span>
</code></pre></div><div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&#34;load&#34;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">remove</span><span class="p">(</span><span class="s2">&#34;preload&#34;</span><span class="p">);</span>
<span class="p">});</span>
</code></pre></div><h1>
  Respect system preferences
</h1>
<p>Finally, to respect the
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme"><code>prefers-color-scheme</code></a>
media query, we add to our first script:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="kr">const</span> <span class="nx">storedTheme</span> <span class="o">=</span> <span class="nx">localStorage</span><span class="p">.</span><span class="nx">getItem</span><span class="p">(</span><span class="s2">&#34;__theme&#34;</span><span class="p">);</span>

<span class="k">if</span> <span class="p">(</span><span class="nx">storedTheme</span><span class="p">)</span> <span class="p">{</span>
  <span class="nb">window</span><span class="p">.</span><span class="mi">__</span><span class="nx">setTheme</span><span class="p">(</span><span class="nx">storedTheme</span><span class="p">);</span>
<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">matchMedia</span><span class="p">(</span><span class="s2">&#34;(prefers-color-scheme: dark)&#34;</span><span class="p">).</span><span class="nx">matches</span><span class="p">)</span> <span class="p">{</span>
  <span class="nb">window</span><span class="p">.</span><span class="mi">__</span><span class="nx">setTheme</span><span class="p">(</span><span class="s2">&#34;dark&#34;</span><span class="p">);</span>
<span class="p">}</span>
</code></pre></div><p>So that, if there&rsquo;s nothing in <code>localStorage</code>, we respect system settings.</p>
<h1>
  Hugo implementation details
</h1>
<p>In <code>layouts/_default/baseof.html</code> template, we need something like this:</p>
<!-- prettier-ignore -->
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-html" data-lang="html"><span class="cp">&lt;!DOCTYPE html&gt;</span>
<span class="p">&lt;</span><span class="nt">html</span><span class="p">&gt;</span>
  <span class="p">&lt;</span><span class="nt">head</span><span class="p">&gt;</span>
  <span class="p">&lt;/</span><span class="nt">head</span><span class="p">&gt;</span>

  <span class="p">&lt;</span><span class="nt">body</span> <span class="na">data-theme</span><span class="o">=</span><span class="s">&#34;light&#34;</span> <span class="na">class</span><span class="o">=</span><span class="s">&#34;preload&#34;</span><span class="p">&gt;</span>
    {{ partial &#34;theme.html&#34; }}

    ...

    {{ partial &#34;theme-button.html&#34; }}
  <span class="p">&lt;/</span><span class="nt">body</span><span class="p">&gt;</span>
<span class="p">&lt;/</span><span class="nt">html</span><span class="p">&gt;</span>
</code></pre></div><p>In <code>partials/theme.html</code> we change theme based on <code>localStorage</code> or
<code>prefers-color-scheme</code>. In <code>layouts/partials/theme-button.html</code> we customize the
button.</p>
<p>Also, to change syntax highlighting colorscheme, we need to add
<code>pygmentsUseClasses = true</code> to our configuration file.</p>
<p>Then, we need to generate stylesheets for each different colorscheme and move
them to our assets folder.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">hugo gen chromastyles --style<span class="o">=</span>monokai &gt; dark-syntax-highlight.css
hugo gen chromastyles --style<span class="o">=</span>lovelace &gt; light-syntax-highlight.css
</code></pre></div><p>Add them to our html (with the dark stylesheet disabled).</p>
<!-- prettier-ignore -->
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-html" data-lang="html">{{ $syntaxHighlight := resources.Get &#34;css/light-syntax-highlight.css&#34; }}
{{ $darkSyntaxHighlight := resources.Get &#34;css/dark-syntax-highlight.css&#34; }}

<span class="p">&lt;</span><span class="nt">link</span> <span class="na">rel</span><span class="o">=</span><span class="s">&#34;stylesheet&#34;</span> <span class="na">href</span><span class="o">=</span><span class="s">&#34;{{ $syntaxHighlight.RelPermalink }}&#34;</span> <span class="p">/&gt;</span>
<span class="p">&lt;</span><span class="nt">link</span> <span class="na">rel</span><span class="o">=</span><span class="s">&#34;stylesheet&#34;</span> <span class="na">href</span><span class="o">=</span><span class="s">&#34;{{ $darkSyntaxHighlight.RelPermalink }}&#34;</span> <span class="na">disabled</span> <span class="p">/&gt;</span>
</code></pre></div><p>And handle enabling/disabling stylesheet when theme changes with JavaScript:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="nb">window</span><span class="p">.</span><span class="mi">__</span><span class="nx">setTheme</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">newTheme</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// ...
</span><span class="c1"></span>  <span class="kr">const</span> <span class="nx">oldTheme</span> <span class="o">=</span> <span class="nx">newTheme</span> <span class="o">===</span> <span class="s2">&#34;dark&#34;</span> <span class="o">?</span> <span class="s2">&#34;light&#34;</span> <span class="o">:</span> <span class="s2">&#34;dark&#34;</span><span class="p">;</span>
  <span class="nb">document</span>
    <span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s2">&#34;link[href*=&#39;&#34;</span> <span class="o">+</span> <span class="nx">oldTheme</span> <span class="o">+</span> <span class="s2">&#34;&#39;]&#34;</span><span class="p">)</span>
    <span class="p">.</span><span class="nx">setAttribute</span><span class="p">(</span><span class="s2">&#34;disabled&#34;</span><span class="p">,</span> <span class="s2">&#34;&#34;</span><span class="p">);</span>
  <span class="nb">document</span>
    <span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s2">&#34;link[href*=&#39;&#34;</span> <span class="o">+</span> <span class="nx">newTheme</span> <span class="o">+</span> <span class="s2">&#34;&#39;]&#34;</span><span class="p">)</span>
    <span class="p">.</span><span class="nx">removeAttribute</span><span class="p">(</span><span class="s2">&#34;disabled&#34;</span><span class="p">);</span>
<span class="p">};</span>
</code></pre></div><p>And that&rsquo;s it, hopefully we can enjoy dark mode now.</p>

