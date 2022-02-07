# [Automating svg to jsx conversion with svgr](https://phelipetls.github.io/posts/automating-svg-to-jsx-conversion-with-svgr/)

September 08, 2021 · 4 min. read time

---

<p>I found that getting svg files from Figma ready to be used in your React
applications can be a bottleneck and prone to error. One way to tackle this is
by using <a href="https://react-svgr.com/">svgr</a> to do this. Its defaults are good
enough, but you&rsquo;re more likely to customize the JavaScript output with a
<a href="https://react-svgr.com/docs/custom-templates/">template</a>.</p>
<p>These templates are babel plugins. Learning how to build one can be quite
intimidating since it&rsquo;s a
<a href="https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md">huge</a>
topic, but worth it.</p>
<p>In this blog post I want to share a template that converts a svg like this:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-svg" data-lang="svg"><span class="nt">&lt;svg</span> <span class="na">role=</span><span class="s">&#34;img&#34;</span> <span class="na">viewBox=</span><span class="s">&#34;0 0 24 24&#34;</span> <span class="na">xmlns=</span><span class="s">&#34;http://www.w3.org/2000/svg&#34;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;path</span> <span class="na">d=</span><span class="s">&#34;&#34;</span> <span class="nt">/&gt;</span>
<span class="nt">&lt;/svg&gt;</span>
</code></pre></div><p>&hellip;into this React component:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-tsx" data-lang="tsx"><span class="kr">import</span> <span class="nx">React</span> <span class="kr">from</span> <span class="s2">&#34;react&#34;</span><span class="p">;</span>
<span class="kr">import</span> <span class="p">{</span> <span class="nx">SvgIcon</span><span class="p">,</span> <span class="nx">SvgIconProps</span> <span class="p">}</span> <span class="kr">from</span> <span class="s2">&#34;@material-ui/core&#34;</span><span class="p">;</span>

<span class="kr">export</span> <span class="kr">const</span> <span class="nx">SvgComponent</span>: <span class="kt">React.FC</span><span class="p">&lt;</span><span class="nt">SvgIconProps</span><span class="p">&gt;</span> <span class="o">=</span> <span class="p">(</span><span class="nx">props</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="p">{</span>
  <span class="k">return</span> <span class="p">(</span>
    <span class="p">&lt;</span><span class="nt">SvgIcon</span> <span class="na">viewBox</span><span class="o">=</span><span class="s">&#34;0 0 24 24&#34;</span> <span class="na">xmlns</span><span class="o">=</span><span class="s">&#34;http://www.w3.org/2000/svg&#34;</span> <span class="p">{</span><span class="na">...props</span><span class="p">}&gt;</span>
      <span class="p">&lt;</span><span class="nt">path</span> <span class="na">d</span><span class="o">=</span><span class="s">&#34;&#34;</span> <span class="p">/&gt;</span>
    <span class="p">&lt;/</span><span class="nt">SvgIcon</span><span class="p">&gt;</span>
  <span class="p">);</span>
<span class="p">};</span>
</code></pre></div><p>You&rsquo;ll notice it uses the Material-UI&rsquo;s <a href="https://next.material-ui.com/api/svg-icon/">SvgIcon</a> component and it&rsquo;s written in TypeScript.</p>
<p>It has some tricky things like type annotations and spread syntax, which is not
obvious how to insert with babel. So let&rsquo;s get to it.</p>
<p>First, the full code if you&rsquo;re only interested in that, but I&rsquo;ll break down the
code further below:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-javascript" data-lang="javascript"><span class="kr">const</span> <span class="p">{</span>
  <span class="nx">identifier</span><span class="p">,</span>
  <span class="nx">tsTypeAnnotation</span><span class="p">,</span>
  <span class="nx">tsTypeReference</span><span class="p">,</span>
  <span class="nx">tsTypeParameterInstantiation</span><span class="p">,</span>
  <span class="nx">jsxClosingElement</span><span class="p">,</span>
  <span class="nx">jsxElement</span><span class="p">,</span>
  <span class="nx">jsxIdentifier</span><span class="p">,</span>
  <span class="nx">jsxOpeningElement</span><span class="p">,</span>
  <span class="nx">jsxSpreadAttribute</span><span class="p">,</span>
<span class="p">}</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;@babel/types&#39;</span><span class="p">)</span>

<span class="kr">const</span> <span class="nx">template</span> <span class="o">=</span> <span class="p">(</span>
  <span class="p">{</span> <span class="nx">template</span> <span class="p">},</span>
  <span class="nx">opts</span><span class="p">,</span>
  <span class="p">{</span> <span class="nx">imports</span><span class="p">,</span> <span class="nx">componentName</span><span class="p">,</span> <span class="nx">props</span><span class="p">,</span> <span class="nx">jsx</span><span class="p">,</span> <span class="nx">exports</span> <span class="p">},</span>
<span class="p">)</span> <span class="p">=&gt;</span> <span class="p">{</span>
  <span class="kr">const</span> <span class="nx">plugins</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;jsx&#39;</span><span class="p">,</span> <span class="s1">&#39;typescript&#39;</span><span class="p">]</span>

  <span class="kr">const</span> <span class="nx">typescriptTemplate</span> <span class="o">=</span> <span class="nx">template</span><span class="p">.</span><span class="nx">smart</span><span class="p">({</span> <span class="nx">plugins</span> <span class="p">})</span>

  <span class="kr">const</span> <span class="nx">wrappedJsx</span> <span class="o">=</span> <span class="nx">jsxElement</span><span class="p">(</span>
    <span class="nx">jsxOpeningElement</span><span class="p">(</span><span class="nx">jsxIdentifier</span><span class="p">(</span><span class="s1">&#39;SvgIcon&#39;</span><span class="p">),</span> <span class="p">[</span>
      <span class="p">...</span><span class="nx">jsx</span><span class="p">.</span><span class="nx">openingElement</span><span class="p">.</span><span class="nx">attributes</span><span class="p">,</span>
      <span class="nx">jsxSpreadAttribute</span><span class="p">(</span><span class="nx">identifier</span><span class="p">(</span><span class="s1">&#39;props&#39;</span><span class="p">)),</span>
    <span class="p">]),</span>
    <span class="nx">jsxClosingElement</span><span class="p">(</span><span class="nx">jsxIdentifier</span><span class="p">(</span><span class="s1">&#39;SvgIcon&#39;</span><span class="p">)),</span>
    <span class="nx">jsx</span><span class="p">.</span><span class="nx">children</span><span class="p">,</span>
    <span class="kc">false</span>
  <span class="p">)</span>

  <span class="nx">componentName</span><span class="p">.</span><span class="nx">typeAnnotation</span> <span class="o">=</span> <span class="nx">tsTypeAnnotation</span><span class="p">(</span>
    <span class="nx">tsTypeReference</span><span class="p">(</span>
      <span class="nx">identifier</span><span class="p">(</span><span class="s1">&#39;React.FC&#39;</span><span class="p">),</span>
      <span class="nx">tsTypeParameterInstantiation</span><span class="p">([</span><span class="nx">tsTypeReference</span><span class="p">(</span><span class="nx">identifier</span><span class="p">(</span><span class="s1">&#39;SvgIconProps&#39;</span><span class="p">))])</span>
    <span class="p">)</span>
  <span class="p">)</span>

  <span class="k">return</span> <span class="nx">typescriptTemplate</span><span class="p">.</span><span class="nx">ast</span><span class="sb">`
</span><span class="sb">    import React from &#39;react&#39;
</span><span class="sb">    import { SvgIcon, SvgIconProps } from &#39;@material-ui/core&#39;
</span><span class="sb">
</span><span class="sb">    export const </span><span class="si">${</span><span class="nx">componentName</span><span class="si">}</span><span class="sb"> = (props) =&gt; {
</span><span class="sb">      return (
</span><span class="sb">        </span><span class="si">${</span><span class="nx">wrappedJsx</span><span class="si">}</span><span class="sb">
</span><span class="sb">      )
</span><span class="sb">    }
</span><span class="sb">  `</span>
<span class="p">}</span>

<span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="nx">template</span>
</code></pre></div><p>First, we use the TypeScript plugin by default to build the AST, there is no
opt out of it:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-javascript" data-lang="javascript"><span class="kr">const</span> <span class="nx">plugins</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;jsx&#39;</span><span class="p">,</span> <span class="s1">&#39;typescript&#39;</span><span class="p">]</span>

<span class="kr">const</span> <span class="nx">typescriptTemplate</span> <span class="o">=</span> <span class="nx">template</span><span class="p">.</span><span class="nx">smart</span><span class="p">({</span> <span class="nx">plugins</span> <span class="p">})</span>
</code></pre></div><h1>
  Jsx
</h1>
<p>Now, the jsx part. Our goal is to replace the built-in <code>svg</code> element with the
<code>SvgIcon</code> component. We can do this by creating a new
<a href="https://babeljs.io/docs/en/babel-types#jsxelement"><code>jsxElement</code></a>, change its
<a href="https://babeljs.io/docs/en/babel-types#jsxopeningelement">opening</a> and
<a href="https://babeljs.io/docs/en/babel-types#jsxclosingelement">closing</a> elements to
be <code>SvgIcon</code> and reuse the child elements (don&rsquo;t mind doing this recursively,
but we could I guess).</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-javascript" data-lang="javascript"><span class="kr">const</span> <span class="nx">wrappedJsx</span> <span class="o">=</span> <span class="nx">jsxElement</span><span class="p">(</span>
  <span class="nx">jsxOpeningElement</span><span class="p">(</span><span class="nx">jsxIdentifier</span><span class="p">(</span><span class="s1">&#39;SvgIcon&#39;</span><span class="p">),</span> <span class="p">[</span>
    <span class="p">...</span><span class="nx">jsx</span><span class="p">.</span><span class="nx">openingElement</span><span class="p">.</span><span class="nx">attributes</span><span class="p">,</span>
    <span class="nx">jsxSpreadAttribute</span><span class="p">(</span><span class="nx">identifier</span><span class="p">(</span><span class="s1">&#39;props&#39;</span><span class="p">)),</span>
  <span class="p">]),</span>
  <span class="nx">jsxClosingElement</span><span class="p">(</span><span class="nx">jsxIdentifier</span><span class="p">(</span><span class="s1">&#39;SvgIcon&#39;</span><span class="p">)),</span>
  <span class="nx">jsx</span><span class="p">.</span><span class="nx">children</span><span class="p">,</span>
  <span class="kc">false</span>
<span class="p">)</span>
</code></pre></div><p>You&rsquo;ll notice how we reuse the same attributes from the original jsx opening
element and also spread <code>props</code> into them using
<a href="https://babeljs.io/docs/en/babel-types#jsxspreadattribute">jsxSpreadAttribute</a>.</p>
<h1>
  Type Annotation
</h1>
<p>Now, to inject the type annotation into the template is what took me the most part.</p>
<p>Initially I thought that this would have worked:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-javascript" data-lang="javascript"><span class="c1">// ...
</span><span class="c1"></span>
<span class="k">return</span> <span class="nx">typescriptTemplate</span><span class="p">.</span><span class="nx">ast</span><span class="sb">`
</span><span class="sb">  import React from &#39;react&#39;
</span><span class="sb">  import { SvgIcon, SvgIconProps } from &#39;@material-ui/core&#39;
</span><span class="sb">
</span><span class="hl"><span class="sb">  export const </span><span class="si">${</span><span class="nx">componentName</span><span class="si">}</span><span class="sb">: React.FC&lt;SvgIconProps&gt; = (props) =&gt; {
</span></span><span class="sb">    return (
</span><span class="sb">      </span><span class="si">${</span><span class="nx">wrappedJsx</span><span class="si">}</span><span class="sb">
</span><span class="sb">    )
</span><span class="sb">  }
</span><span class="sb">`</span></code></pre></div>
<p>But the type annotation, <code>: React.FC&lt;SvgIconProps&gt;</code> is stripped out from the
final output file.</p>
<p>Then I went with this hack:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-javascript" data-lang="javascript"><span class="nx">componentName</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="s1">&#39;SvgComponent: React.FC&lt;SvgIconProps&gt;&#39;</span>
</code></pre></div><p>This works but it doesn&rsquo;t spark joy&hellip; Then I decided to put in more effort and
I came up with this (more verbose) solution:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-javascript" data-lang="javascript"><span class="nx">componentName</span><span class="p">.</span><span class="nx">typeAnnotation</span> <span class="o">=</span> <span class="nx">tsTypeAnnotation</span><span class="p">(</span>
  <span class="nx">tsTypeReference</span><span class="p">(</span>
    <span class="nx">identifier</span><span class="p">(</span><span class="s1">&#39;React.FC&#39;</span><span class="p">),</span>
    <span class="nx">tsTypeParameterInstantiation</span><span class="p">([</span><span class="nx">tsTypeReference</span><span class="p">(</span><span class="nx">identifier</span><span class="p">(</span><span class="s1">&#39;SvgIconProps&#39;</span><span class="p">))])</span>
  <span class="p">)</span>
<span class="p">)</span>
</code></pre></div><p>It cost me some more hours but it made me learn more about how to build AST
nodes so the next time I have to do it will be hopefully more easy. I figured
this out by reading the <a href="https://babeljs.io/docs/en/babel-types">babel-types</a>
docs.</p>
<h1>
  Usage in Vim
</h1>
<p>If you&rsquo;re a vimmer, you can convert the current file by using <code>%!npx @svgr/cli --template path/to/template.js</code>, which will pass the entire file to the command
as standard input and replace its content with the command&rsquo;s standard output.
In case you didn&rsquo;t know, this is a built-in feature called
<a href="http://vimdoc.sourceforge.net/htmldoc/change.html#filter">filter</a>.</p>
<p>You could also configure your project to use a template by default with a
<a href="https://react-svgr.com/docs/configuration-files/"><code>.svgrrc</code></a> file at the
project&rsquo;s root folder:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-javascript" data-lang="javascript"><span class="c1">// .svgrrc.js
</span><span class="c1"></span><span class="nx">module</span><span class="p">.</span><span class="nx">exports</span> <span class="o">=</span> <span class="p">{</span>
<span class="nx">template</span><span class="o">:</span> <span class="nx">require</span><span class="p">(</span><span class="s1">&#39;./path/to/template.js&#39;</span><span class="p">)</span>
<span class="p">}</span>
</code></pre></div><h1>
  Usage in VS Code
</h1>
<p>Of course, svgr also has a <a href="https://marketplace.visualstudio.com/items?itemName=NathHorrigan.code-svgr">VS Code
extension</a>.
But, if you prefer, you could use the <a href="https://marketplace.visualstudio.com/items?itemName=ryu1kn.edit-with-shell">Edit With Shell
Command</a>
extension, which allows you to do something similar to Vim&rsquo;s filter.</p>
<h1>
  TODOs
</h1>
<p>Here are some improvements I couldn&rsquo;t figure out how to do/don&rsquo;t care so much,
but it would be nice to have:</p>
<ul>
<li>Use the file name as component name.</li>
<li>Retain empty lines in the final output.</li>
<li>Remove semicolons.</li>
</ul>
<p>Right now this still requires some manual labor to get 100% right, but it&rsquo;s ok.</p>
<h1>
  Conclusion
</h1>
<p>Ideally I shouldn&rsquo;t be converting svg files into React components in this ad
hoc way, but rather use a library with all the icons ready, which unfortunately
nobody at work bothered to make.</p>
<p>But svgr seems like a good idea for maintaining an icons library, since I could
then update an arbitrary number of files by changing just a template and
running a cli program, which isn&rsquo;t bad.</p>

