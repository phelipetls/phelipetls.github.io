# [Node.js one-liner to read JSON files](https://phelipetls.github.io/posts/nodejs-one-liner-to-read-json-files/)

January 26, 2022 · 1 min. read time

---

<p>Imagine we have the following JSON file and we want to use the highlighted
line&rsquo;s value in a script.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-json" data-lang="json"><span class="p">{</span>
  <span class="nt">&#34;expo&#34;</span><span class="p">:</span> <span class="p">{</span>
<span class="hl">    <span class="nt">&#34;name&#34;</span><span class="p">:</span> <span class="s2">&#34;MyApp&#34;</span><span class="p">,</span>
</span>    <span class="nt">&#34;slug&#34;</span><span class="p">:</span> <span class="s2">&#34;myapp&#34;</span><span class="p">,</span>
    <span class="nt">&#34;version&#34;</span><span class="p">:</span> <span class="s2">&#34;1.0.0&#34;</span>
  <span class="p">}</span>
<span class="p">}</span>
</code></pre></div><p>I think most people would use <code>jq</code> to do it:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">jq .expo.name app.json
</code></pre></div><p>But it turns out it&rsquo;s just as easy with Node.js:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">node -p <span class="s2">&#34;require(&#39;./app.json&#39;).expo.name&#34;</span>
</code></pre></div><p>But a quick research revealed that this just works if the file has a <code>.json</code>
extension, otherwise Node.js wouldn&rsquo;t parse its contents as JSON automatically.
So you&rsquo;d have to do it yourself:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">node -p <span class="s2">&#34;JSON.parse(require(&#39;fs&#39;).readFileSync(&#39;./app)).expo.name&#34;</span>
</code></pre></div>
