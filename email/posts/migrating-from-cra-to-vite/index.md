# [Migrating from create-react-app to Vite](https://phelipetls.github.io/posts/migrating-from-cra-to-vite/)

April 23, 2021 · 3 min. read time

---

<p>I started to learn React with <code>create-react-app</code> like everyone else, and it
really does its job well. I never had to worry too much about tooling but&hellip; it
is slow to start up.</p>
<p>This never bothered me too much but it&rsquo;s noticeable and everyone would agree it
could be better. Lately, we&rsquo;re witnessing projects developed to improve on this,
more noticeably <a href="https://github.com/evanw/esbuild">esbuild</a> and
<a href="https://vitejs.dev/">Vite</a>.</p>
<p>I wanted to try this out and thought about migrating a small app of mine, mostly
written in Typescript, to Vite. And it was more easy than I expected.</p>
<h1>
  Initial setup
</h1>
<p>First, I installed Vite:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">npm install vite
</code></pre></div><p>Updated my npm scripts:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-diff" data-lang="diff"><span class="gh">diff --git a/package.json b/package.json
</span><span class="gh">index f3307f5..32724e4 100644
</span><span class="gh"></span><span class="gd">--- a/package.json
</span><span class="gd"></span><span class="gi">+++ b/package.json
</span><span class="gi"></span><span class="gu">@@ -31,10 +31,10 @@
</span><span class="gu"></span>     &#34;typescript&#34;: &#34;^4.1.2&#34;
   },
   &#34;scripts&#34;: {
<span class="gd">-    &#34;start&#34;: &#34;react-app-rewired start&#34;,
</span><span class="gd"></span><span class="gi">+    &#34;start&#34;: &#34;vite&#34;,
</span><span class="gi"></span><span class="gd">-    &#34;build&#34;: &#34;react-app-rewired build&#34;,
</span><span class="gd"></span><span class="gi">+    &#34;build&#34;: &#34;vite build&#34;,
</span><span class="gi"></span>     &#34;test&#34;: &#34;react-scripts test&#34;,
</code></pre></div><p>Next, I needed to modify my <code>index.html</code> file.
<a href="https://vitejs.dev/guide/#index-html-and-project-root">The reasons for the following steps are explained in more detail here</a>.</p>
<p>Moved my <code>index.html</code> from the <code>./public</code> folder to my project&rsquo;s root folder and
added a <code>script</code> tag with my JS entry point as its <code>src</code> attribute.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-diff" data-lang="diff"><span class="gh">diff --git a/public/index.html b/index.html
</span><span class="gh"></span>similarity index 88%
rename from public/index.html
rename to index.html
<span class="gh">index ecb0830..3abb36f 100644
</span><span class="gh"></span><span class="gd">--- a/public/index.html
</span><span class="gd"></span><span class="gi">+++ b/index.html
</span><span class="gi"></span><span class="gu">@@ -12,5 +12,6 @@
</span><span class="gu"></span>   &lt;body&gt;
     &lt;noscript&gt;You need to enable JavaScript to run this app.&lt;/noscript&gt;
     &lt;div id=&#34;root&#34;&gt;&lt;/div&gt;
<span class="gi">+    &lt;script type=&#34;module&#34; src=&#34;/src/index.jsx&#34;&gt;&lt;/script&gt;
</span><span class="gi"></span>   &lt;/body&gt;
 &lt;/html&gt;
</code></pre></div><p>I didn&rsquo;t had to but if you have any <code>%PUBLIC_URL%</code> in your html file, just
replace it with <code>/</code>, as explained in the linked article.</p>
<h1>
  TypeScript setup
</h1>
<p>At this point, I couldn&rsquo;t get my app to run because my project used
<code>tsconfig.json</code> <code>include</code> properties to make absolute imports, which Vite didn&rsquo;t
understand.</p>
<p>The solution was simple: install a Vite plugin called
<a href="https://github.com/aleclarson/vite-tsconfig-paths"><code>vite-tsconfig-paths</code></a> which
supports, apart from
<a href="https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping">path mapping</a>,
<code>include</code> and <code>exclude</code> properties as well:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">npm install vite-tsconfig-paths
</code></pre></div><p>Once installed, we add it to our <code>vite.config.ts</code>:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-ts" data-lang="ts"><span class="kr">import</span> <span class="p">{</span> <span class="nx">defineConfig</span> <span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;vite&#34;</span><span class="p">;</span>
<span class="kr">import</span> <span class="nx">tsconfigPaths</span> <span class="kr">from</span> <span class="s2">&#34;vite-tsconfig-paths&#34;</span><span class="p">;</span>

<span class="kr">export</span> <span class="k">default</span> <span class="nx">defineConfig</span><span class="p">({</span>
  <span class="nx">build</span><span class="o">:</span> <span class="p">{</span>
    <span class="nx">outDir</span><span class="o">:</span> <span class="s2">&#34;build&#34;</span>
  <span class="p">},</span>
  <span class="nx">plugins</span><span class="o">:</span> <span class="p">[</span><span class="nx">tsconfigPaths</span><span class="p">()]</span>
<span class="p">});</span>
</code></pre></div><p>I also set the output directory to be <code>build</code>, instead of the default <code>dist</code>,
because that&rsquo;s what CRA uses.</p>
<p>After that, I was able to start a server and see my app running.</p>
<h1>
  Jest setup
</h1>
<p>Because I intended to remove <code>react-scripts</code> from my project, I needed to figure
out how to run my Jest tests without <code>react-scripts test</code>.</p>
<p>I needed a way to get Jest to understand/transpile TypeScript and JSX.</p>
<p>Fortunately, there is project to help with that called
<a href="https://kulshekhar.github.io/ts-jest/"><code>ts-jest</code></a>. All we need to do is add it
as a jest preset in <code>jest.config.js</code>:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="p">{</span>
  <span class="nx">preset</span><span class="o">:</span> <span class="s2">&#34;ts-jest&#34;</span><span class="p">,</span>
  <span class="nx">setupFilesAfterEnv</span><span class="o">:</span> <span class="p">[</span><span class="s2">&#34;&lt;rootDir&gt;src/setupTests.ts&#34;</span><span class="p">],</span>
  <span class="nx">testPathIgnorePatterns</span><span class="o">:</span> <span class="p">[</span><span class="s2">&#34;&lt;rootDir&gt;/cypress/&#34;</span><span class="p">],</span>
  <span class="nx">moduleDirectories</span><span class="o">:</span> <span class="p">[</span><span class="s2">&#34;node_modules&#34;</span><span class="p">,</span> <span class="s2">&#34;src&#34;</span><span class="p">]</span>
<span class="p">};</span>
</code></pre></div><p>For my specific setup, I also needed to:</p>
<ul>
<li>Ignore <code>*.spec.js</code> files inside <code>./cypress/integration</code> folder</li>
<li>Rename <code>./src/setupTests.js</code> to <code>./src/setupTests.ts</code>. Otherwise, types from
the <code>@testing-library/jest-dom/extend-expect</code> wouldn&rsquo;t be imported.</li>
<li>Add <code>&quot;src&quot;</code> to <code>moduleDirectories</code>, because it would not understand absolute
imports that look up paths inside <code>tsconfig.json</code> <code>include</code> property</li>
</ul>
<h1>
  Conclusion
</h1>
<p>This seems to be working fine so far, development environment is much faster to
boot, though I haven&rsquo;t checked how great hot reloading is.</p>
<p>But I&rsquo;m amazed by that first experience and how straightforward it was.</p>
<p>Finally, I uninstalled my CRA-related dev dependencies:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">npm uninstall react-scripts customize-cra react-app-rewired babel-plugin-import
</code></pre></div>
