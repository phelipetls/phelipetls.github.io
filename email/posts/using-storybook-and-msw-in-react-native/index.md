# [Using Storybook and MSW in React Native](https://phelipetls.github.io/posts/using-storybook-and-msw-in-react-native/)

March 02, 2022 · 5 min. read time

---

<p>The integration between <a href="storybook.js.org/">Storybook</a> and <a href="https://mswjs.io/">Mock Service
Worker</a> enables you to develop components isolated from your
app and your back-end server.</p>
<p>This is
<a href="https://hmh.engineering/storybook-and-mock-service-worker-a-match-made-in-heaven-e762bd7951ce">not</a>
<a href="https://blog.logrocket.com/using-storybook-and-mock-service-worker-for-mocked-api-responses/">new</a>
on the web, the
<a href="https://storybook.js.org/addons/msw-storybook-addon"><code>msw-storybook-addon</code></a>
makes it easy to get started. It&rsquo;s another story for React Native though, since
<a href="https://github.com/mswjs/msw/issues/203">MSW has only recently started supporting it</a>.</p>
<p>I find this combination of tools invaluable, so I couldn&rsquo;t resist attempting to
make it work in React Native, even though it&rsquo;s pretty new.</p>
<p>In this post, I&rsquo;m gonna explain in detail how I did it.</p>
<section data-note class="flex my-8 gap-4 p-4 border-2 rounded border-note bg-surface">
  <div class="text-note">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
  <circle cx="12" cy="12" r="10"/>
  <line x1="12" y1="16" x2="12" y2="12"/>
  <line x1="12" y1="8" x2="12.01" y2="8"/>
</svg>

  </div>

  <div>
    <strong>tl;dr:</strong> You can read the <a href="https://github.com/phelipetls/react-native-storybook-msw">example
repository</a> or this
<a href="https://github.com/phelipetls/react-native-storybook-msw/pull/1">pull request</a>
instead.
  </div>
</section>

<h1>
  How <code>msw-storybook-addon</code> works?
</h1>
<p>Our end goal is to port <code>msw-storybook-addon</code> to React Native. So let&rsquo;s first
understand how it works.</p>
<p>This is a library by the MSW team that provides you with a
<a href="https://storybook.js.org/docs/react/writing-stories/decorators">global decorator</a>.
From the docs, <a href="https://github.com/mswjs/msw-storybook-addon">here&rsquo;s how you add to your Storybook configuration</a>:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="c1">// ./storybook/preview.js
</span><span class="c1"></span><span class="kr">import</span> <span class="p">{</span> <span class="nx">initialize</span><span class="p">,</span> <span class="nx">mswDecorator</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;msw-storybook-addon&#39;</span><span class="p">;</span>

<span class="nx">initialize</span><span class="p">();</span>
<span class="kr">export</span> <span class="kr">const</span> <span class="nx">decorators</span> <span class="o">=</span> <span class="p">[</span><span class="nx">mswDecorator</span><span class="p">];</span>
</code></pre></div><p>And <a href="https://github.com/mswjs/msw-storybook-addon#usage">here&rsquo;s how you use
it</a>:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="kr">import</span> <span class="p">{</span> <span class="nx">rest</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;msw&#39;</span>
<span class="kr">import</span> <span class="p">{</span> <span class="nx">UserProfile</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;./UserProfile&#39;</span>

<span class="kr">export</span> <span class="kr">const</span> <span class="nx">SuccessBehavior</span> <span class="o">=</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="o">&lt;</span><span class="nx">UserProfile</span> <span class="o">/&gt;</span>

<span class="nx">SuccessBehavior</span><span class="p">.</span><span class="nx">parameters</span> <span class="o">=</span> <span class="p">{</span>
  <span class="nx">msw</span><span class="o">:</span> <span class="p">{</span>
    <span class="nx">handlers</span><span class="o">:</span> <span class="p">[</span>
      <span class="nx">rest</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;/user&#39;</span><span class="p">,</span> <span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">,</span> <span class="nx">ctx</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
        <span class="k">return</span> <span class="nx">res</span><span class="p">(</span>
          <span class="nx">ctx</span><span class="p">.</span><span class="nx">json</span><span class="p">({</span>
            <span class="nx">firstName</span><span class="o">:</span> <span class="s1">&#39;Neil&#39;</span><span class="p">,</span>
            <span class="nx">lastName</span><span class="o">:</span> <span class="s1">&#39;Maverick&#39;</span><span class="p">,</span>
          <span class="p">})</span>
        <span class="p">)</span>
      <span class="p">}),</span>
    <span class="p">]</span>
  <span class="p">},</span>
<span class="p">}</span>
</code></pre></div><p>This code is using Storybook v6, but only Storybook v5 is available for React
Native. Fortunately, both versions support decorators, they differ mostly about
how you configure/use it:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="c1">// storybook/index.js
</span><span class="c1"></span><span class="kr">import</span> <span class="p">{</span> <span class="nx">getStorybookUI</span><span class="p">,</span> <span class="nx">configure</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@storybook/react-native&#39;</span>
<span class="hl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">addDecorator</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@storybook/react-native&#39;</span>
</span><span class="hl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">withMsw</span><span class="p">,</span> <span class="nx">initialize</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;./mswDecorator&#39;</span>
</span>
<span class="kr">import</span> <span class="s1">&#39;./rn-addons&#39;</span>

<span class="hl"><span class="nx">initialize</span><span class="p">()</span>
</span><span class="nx">addDecorator</span><span class="p">(</span><span class="nx">withMsw</span><span class="p">)</span>

<span class="c1">// import stories
</span><span class="c1"></span><span class="nx">configure</span><span class="p">(()</span> <span class="p">=&gt;</span> <span class="p">{</span>
  <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;../components/Task.stories.js&#39;</span><span class="p">)</span>
<span class="p">},</span> <span class="nx">module</span><span class="p">)</span>

<span class="kr">const</span> <span class="nx">StorybookUIRoot</span> <span class="o">=</span> <span class="nx">getStorybookUI</span><span class="p">({</span>
  <span class="nx">asyncStorage</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span>
<span class="p">})</span>

<span class="kr">export</span> <span class="k">default</span> <span class="nx">StorybookUIRoot</span>
</code></pre></div><h1>
  Porting <code>msw-storybook-addon</code> to React Native
</h1>
<p>A decorator is simply a function that takes the story and do something with it
before it renders.</p>
<p>Here&rsquo;s what we need to do before rendering the story:</p>
<ul>
<li>Initialize the MSW server.</li>
<li>Clean it up, which means to reset old request handlers.</li>
<li>Configure it to use new handlers.</li>
</ul>
<p>Our implementation should not differ very much from the <code>msw-storybook-addon</code>
<a href="https://github.com/mswjs/msw-storybook-addon/blob/35a4b198a4b4eead9a2d0771f81460c6788e77a7/packages/msw-addon/src/mswDecorator.ts#L69-L102">implementation</a>.</p>
<h2>
  First problem: how to initialize the server?
</h2>
<p>We can&rsquo;t use <a href="https://mswjs.io/docs/api/setup-worker"><code>setupWorker</code></a> because
we&rsquo;re not in a browser, we don&rsquo;t have service workers.
<a href="https://mswjs.io/docs/api/setup-server"><code>setupServer</code></a> also won&rsquo;t work, we
don&rsquo;t have Node.</p>
<p>It turns out that we need to use <code>setupServer</code> function from the <code>msw/native</code>
module. This is still undocumented, you&rsquo;ll only read about it in <a href="https://github.com/mswjs/msw/issues/203">this GitHub
issue</a> and in <a href="https://github.com/mswjs/examples/pull/60">this example has more
details on how to use it</a>.</p>
<h2>
  Show me the code
</h2>
<p>What follows is what worked for me. You can ignore all non highlighted code,
since it&rsquo;s only meant to stay compatible with the <a href="https://github.com/mswjs/msw-storybook-addon/blob/35a4b198a4b4eead9a2d0771f81460c6788e77a7/packages/msw-addon/src/mswDecorator.ts#L69-L102"><code>msw-storybook-addon</code>
API</a>.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-js" data-lang="js"><span class="c1">// ./mswDecorator.js
</span><span class="hl"><span class="c1"></span><span class="kr">import</span> <span class="s1">&#39;react-native-url-polyfill/auto&#39;</span>
</span><span class="hl"><span class="kr">import</span> <span class="p">{</span> <span class="nx">setupServer</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;msw/native&#39;</span>
</span><span class="hl">
</span><span class="hl"><span class="kr">const</span> <span class="nx">server</span> <span class="o">=</span> <span class="nx">setupServer</span><span class="p">()</span>
</span><span class="hl">
</span><span class="hl"><span class="kr">export</span> <span class="kr">const</span> <span class="nx">initialize</span> <span class="o">=</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">{</span>
</span><span class="hl">  <span class="c1">// Do not warn or error out if a non-mocked request happens.
</span></span><span class="hl"><span class="c1"></span>  <span class="c1">// If we don&#39;t use this, Storybook will be spammy about requests made to
</span></span><span class="hl"><span class="c1"></span>  <span class="c1">// fetch the JS bundle etc.
</span></span><span class="hl"><span class="c1"></span>  <span class="nx">server</span><span class="p">.</span><span class="nx">listen</span><span class="p">({</span> <span class="nx">onUnhandledRequest</span><span class="o">:</span> <span class="s1">&#39;bypass&#39;</span> <span class="p">})</span>
</span><span class="hl"><span class="p">}</span>
</span>
<span class="kr">export</span> <span class="kr">const</span> <span class="nx">withMsw</span> <span class="o">=</span> <span class="p">(</span><span class="nx">storyFn</span><span class="p">,</span> <span class="p">{</span> <span class="nx">parameters</span><span class="o">:</span> <span class="p">{</span> <span class="nx">msw</span> <span class="p">}</span> <span class="p">})</span> <span class="p">=&gt;</span> <span class="p">{</span>
  <span class="nx">server</span><span class="p">.</span><span class="nx">resetHandlers</span><span class="p">()</span>

  <span class="k">if</span> <span class="p">(</span><span class="nx">msw</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">if</span> <span class="p">(</span><span class="nb">Array</span><span class="p">.</span><span class="nx">isArray</span><span class="p">(</span><span class="nx">msw</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">msw</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
      <span class="c1">// Support an Array of request handlers (backwards compatibility).
</span><span class="c1"></span>      <span class="nx">server</span><span class="p">.</span><span class="nx">use</span><span class="p">(...</span><span class="nx">msw</span><span class="p">)</span>
    <span class="p">}</span>
  <span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="s1">&#39;handlers&#39;</span> <span class="k">in</span> <span class="nx">msw</span> <span class="o">&amp;&amp;</span> <span class="nx">msw</span><span class="p">.</span><span class="nx">handlers</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// Support an Array named request handlers handlers
</span><span class="c1"></span>    <span class="c1">// or an Object of named request handlers with named arrays of handlers
</span><span class="c1"></span>    <span class="kr">const</span> <span class="nx">handlers</span> <span class="o">=</span> <span class="nb">Object</span><span class="p">.</span><span class="nx">values</span><span class="p">(</span><span class="nx">msw</span><span class="p">.</span><span class="nx">handlers</span><span class="p">)</span>
      <span class="p">.</span><span class="nx">filter</span><span class="p">(</span><span class="nb">Boolean</span><span class="p">)</span>
      <span class="p">.</span><span class="nx">reduce</span><span class="p">(</span>
          <span class="p">(</span><span class="nx">handlers</span><span class="p">,</span> <span class="nx">handlersList</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="nx">handlers</span><span class="p">.</span><span class="nx">concat</span><span class="p">(</span><span class="nx">handlersList</span><span class="p">),</span>
          <span class="p">[]</span> <span class="nx">as</span> <span class="nx">RequestHandler</span><span class="p">[]</span>
          <span class="p">)</span>

      <span class="k">if</span> <span class="p">(</span><span class="nx">handlers</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">api</span><span class="p">.</span><span class="nx">use</span><span class="p">(...</span><span class="nx">handlers</span><span class="p">)</span>
      <span class="p">}</span>
  <span class="p">}</span>

  <span class="k">return</span> <span class="nx">storyFn</span><span class="p">()</span>
<span class="p">}</span>
</code></pre></div><p>You&rsquo;ll notice that we import a polyfill. This is required, as explained
<a href="https://github.com/mswjs/examples/pull/60/files">here</a>:</p>
<blockquote>
<p>The polyfill <code>react-native-url-polyfill</code> is required or else calling
<code>server.start()</code> will result in an Error: not implemented message followed
by Error: Invariant Violation: Module AppRegistry is not a registered
callable module (calling runApplication)&hellip; due to the barebones React
Native URL polyfill that throws Not Implemented exceptions for functions
that MSW calls such as
<a href="https://github.com/facebook/react-native/blob/cd347a7e0ed29ae1049e041fcb34588e1aac76f9/Libraries/Blob/URL.js#L194">search()</a>.</p>
</blockquote>
<h1>
  Usage
</h1>
<p>Now things should work exactly like <code>msw-storybook-addon</code>, except that you&rsquo;ll
be using Storybook v5, so it&rsquo;s a little bit different:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-jsx" data-lang="jsx"><span class="kr">import</span> <span class="nx">React</span> <span class="nx">from</span> <span class="s1">&#39;react&#39;</span>
<span class="kr">import</span> <span class="p">{</span> <span class="nx">storiesOf</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@storybook/react-native&#39;</span>
<span class="kr">import</span> <span class="p">{</span> <span class="nx">rest</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;msw&#39;</span>
<span class="kr">import</span> <span class="p">{</span> <span class="nx">UserProfile</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;./UserProfile&#39;</span>

<span class="nx">storiesOf</span><span class="p">(</span><span class="s1">&#39;Routes&#39;</span><span class="p">,</span> <span class="nx">module</span><span class="p">)</span>
  <span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="s1">&#39;SuccessBehavior&#39;</span><span class="p">,</span> <span class="p">()</span> <span class="p">=&gt;</span> <span class="p">&lt;</span><span class="nt">UserProfile</span> <span class="p">/&gt;,</span> <span class="p">{</span>
    <span class="nx">msw</span><span class="o">:</span> <span class="p">{</span>
      <span class="nx">handlers</span><span class="o">:</span> <span class="p">[</span>
        <span class="nx">rest</span><span class="p">.</span><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;/user&#39;</span><span class="p">,</span> <span class="p">(</span><span class="nx">req</span><span class="p">,</span> <span class="nx">res</span><span class="p">,</span> <span class="nx">ctx</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
          <span class="k">return</span> <span class="nx">res</span><span class="p">(</span>
            <span class="nx">ctx</span><span class="p">.</span><span class="nx">json</span><span class="p">({</span>
              <span class="nx">firstName</span><span class="o">:</span> <span class="s1">&#39;Neil&#39;</span><span class="p">,</span>
              <span class="nx">lastName</span><span class="o">:</span> <span class="s1">&#39;Maverick&#39;</span><span class="p">,</span>
            <span class="p">})</span>
          <span class="p">)</span>
        <span class="p">}),</span>
      <span class="p">],</span>
    <span class="p">},</span>
  <span class="p">})</span>
</code></pre></div><h1>
  Example repository using the official <code>react-native</code> CLI
</h1>
<p>To prove my point, I implemented the whole thing in a brand new React Native
project using <code>react-native</code> CLI:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">npx react-native init projectName
</code></pre></div><p><a href="https://github.com/phelipetls/react-native-storybook-msw">You can check the final result in this GitHub
repository</a>. Here&rsquo;s a
video:</p>
<div class="bg-divider rounded py-4 px-8 my-4">
  <video class="mx-auto" controls src="./demo-msw-storybook-react-native.mp4">
  </video>
</div>

<p>To my surprise, I struggled the most to get Storybook working. I came up with
issues related with a Promise polyfill that caused <code>Promises</code> to never resolve
and to <a href="https://github.com/storybookjs/react-native/issues/20"><code>Promise.finally</code> being
undefined</a>. I fixed it
by using <code>patch-package</code> to remove the line importing the polyfill, <a href="https://github.com/storybookjs/react-native/issues/20">as the
<code>@storybook/react-native</code> maintainer
recommended</a>. This is
unfortunate&hellip; I hope that a stable Storybook v6 comes soon enough for React
Native.</p>
<p>Besides that, everything worked as expected and I hope it works for your
project too! I didn&rsquo;t have this problem with a project using Expo&rsquo;s Bare
Workflow, not sure why though.</p>
<h1>
  Advice for <code>react-query</code> users
</h1>
<p>If you use <code>react-query</code>, I think it&rsquo;s also wise to call
<a href="https://react-query.tanstack.com/reference/QueryClient#queryclientclear"><code>QueryClient.clear</code></a>
in a decorator, to avoid surprises with the cache.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-javascript" data-lang="javascript"><span class="c1">// storybook/index.js
</span><span class="c1"></span><span class="kr">import</span> <span class="p">{</span> <span class="nx">addDecorator</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;@storybook/react-native&#39;</span>
<span class="kr">import</span> <span class="p">{</span> <span class="nx">queryClient</span> <span class="p">}</span> <span class="nx">from</span> <span class="s1">&#39;../lib/react-query&#39;</span>

<span class="nx">addDecorator</span><span class="p">((</span><span class="nx">storyFn</span><span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
  <span class="nx">queryClient</span><span class="p">.</span><span class="nx">clear</span><span class="p">()</span>

  <span class="k">return</span> <span class="nx">storyFn</span><span class="p">()</span>
<span class="p">})</span>
</code></pre></div>
