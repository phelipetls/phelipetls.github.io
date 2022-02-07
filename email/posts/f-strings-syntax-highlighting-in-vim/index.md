# [Python f-strings syntax highlighting in Vim](https://phelipetls.github.io/posts/f-strings-syntax-highlighting-in-vim/)

October 28, 2020 · 3 min. read time

---

<p><strong>UPDATE 2020-10-30</strong>: First iteration of this post was very naive, supporting
only the very basic. See the
<a href="https://gist.github.com/phelipetls/8726d6cd68e66ad6b83586ae53f3b3d8/revisions#diff-8108a43d0db89a371349e6de001c6932fba065485f6790dddd5b011e7ae7f527">diff</a>
that adds support for string modifiers and escape sequences.</p>
<p>Getting Python syntax highlighting to work in Vim requires very little code, to
my surprise.</p>
<p><img src="./before.png" alt="Before"> <img src="./after.png" alt="After"></p>
<p>Here is everything that you need and an explanation below.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vim" data-lang="vim"><span class="c">&#34; in ~/.config/nvim/after/syntax or ~/.vim/after/syntax</span><span class="err">
</span><span class="err"></span><span class="nx">syn</span> <span class="nx">match</span> <span class="nx">pythonEscape</span> <span class="p">+</span>{{<span class="p">+</span> <span class="nx">contained</span> <span class="nx">containedin</span><span class="p">=</span><span class="nx">pythonfString</span><span class="p">,</span><span class="nx">pythonfDocstring</span><span class="err">
</span><span class="err"></span><span class="nx">syn</span> <span class="nx">match</span> <span class="nx">pythonEscape</span> <span class="p">+</span>}}<span class="p">+</span> <span class="nx">contained</span> <span class="nx">containedin</span><span class="p">=</span><span class="nx">pythonfString</span><span class="p">,</span><span class="nx">pythonfDocstring</span><span class="err">
</span><span class="err">
</span><span class="err"></span><span class="nx">syn</span> <span class="nx">region</span> <span class="nx">pythonfString</span> <span class="nx">matchgroup</span><span class="p">=</span><span class="nx">pythonQuotes</span><span class="err">
</span><span class="err"></span>      \ <span class="nx">start</span><span class="p">=+</span>[<span class="nx">fF</span>]\@<span class="m">1</span><span class="p">&lt;=</span>\<span class="nx">z</span><span class="p">(</span>[&#39;<span class="s2">&#34;]\)+ end=&#34;</span>\<span class="nx">z1</span>&#34;<span class="err">
</span><span class="err"></span>      \ <span class="nx">contains</span><span class="p">=</span>@<span class="nx">Spell</span><span class="p">,</span><span class="nx">pythonEscape</span><span class="p">,</span><span class="nx">pythonInterpolation</span><span class="err">
</span><span class="err"></span><span class="nx">syn</span> <span class="nx">region</span> <span class="nx">pythonfDocstring</span> <span class="nx">matchgroup</span><span class="p">=</span><span class="nx">pythonQuotes</span><span class="err">
</span><span class="err"></span>      \ <span class="nx">start</span><span class="p">=+</span>[<span class="nx">fF</span>]\@<span class="m">1</span><span class="p">&lt;=</span>\<span class="nx">z</span><span class="p">(</span><span class="s1">&#39;&#39;</span>&#39;\<span class="p">|</span><span class="s2">&#34;&#34;&#34;\)+ end=&#34;</span>\<span class="nx">z1</span>&#34; <span class="nx">keepend</span><span class="err">
</span><span class="err"></span>      \ <span class="nx">contains</span><span class="p">=</span>@<span class="nx">Spell</span><span class="p">,</span><span class="nx">pythonEscape</span><span class="p">,</span><span class="nx">pythonSpaceError</span><span class="p">,</span><span class="nx">pythonInterpolation</span><span class="p">,</span><span class="nx">pythonDoctest</span><span class="err">
</span><span class="err">
</span><span class="err"></span><span class="nx">syn</span> <span class="nx">region</span> <span class="nx">pythonInterpolation</span> <span class="nx">contained</span><span class="err">
</span><span class="err"></span>      \ <span class="nx">matchgroup</span><span class="p">=</span><span class="nx">SpecialChar</span><span class="err">
</span><span class="err"></span>      \ <span class="nx">start</span><span class="p">=+</span>{{\@<span class="p">!+</span> <span class="nx">end</span><span class="p">=+</span>}}\@<span class="p">!+</span> <span class="nx">skip</span><span class="p">=+</span>{{<span class="p">+</span> <span class="nx">keepend</span><span class="err">
</span><span class="err"></span>      \ <span class="nx">contains</span><span class="p">=</span><span class="nx">ALLBUT</span><span class="p">,</span><span class="nx">pythonDecoratorName</span><span class="p">,</span><span class="nx">pythonDecorator</span><span class="p">,</span><span class="nx">pythonFunction</span><span class="p">,</span><span class="nx">pythonDoctestValue</span><span class="p">,</span><span class="nx">pythonDoctest</span><span class="err">
</span><span class="err">
</span><span class="err"></span><span class="nx">syn</span> <span class="nx">match</span> <span class="nx">pythonStringModifier</span> <span class="sr">/:\(.[&lt;^=&gt;]\)\?[-+ ]\?#\?0\?[0-9]*[_,]\?\(\.[0-9]*\)\?[bcdeEfFgGnosxX%]\?/</span> <span class="nx">contained</span> <span class="nx">containedin</span><span class="p">=</span><span class="nx">pythonInterpolation</span><span class="err">
</span><span class="err"></span><span class="nx">syn</span> <span class="nx">match</span> <span class="nx">pythonStringModifier</span> <span class="sr">/![sra]/</span> <span class="nx">contained</span> <span class="nx">containedin</span><span class="p">=</span><span class="nx">pythonInterpolation</span><span class="err">
</span><span class="err">
</span><span class="err"></span><span class="nx">hi</span> <span class="nx">link</span> <span class="nx">pythonfString</span> <span class="nx">String</span><span class="err">
</span><span class="err"></span><span class="nx">hi</span> <span class="nx">link</span> <span class="nx">pythonfDocstring</span> <span class="nx">String</span><span class="err">
</span><span class="err"></span><span class="nx">hi</span> <span class="nx">link</span> <span class="nx">pythonStringModifier</span> <span class="nx">PreProc</span><span class="err">
</span></code></pre></div><h1>
  Declaring a syntax region for f-strings
</h1>
<p>The first two lines define a new syntax region (see <code>:h syn-region</code>) called
<code>pythonfString</code>.</p>
<p>We then declare how it starts with the regex <code>[fF]\@1&lt;=\z(['&quot;]\)</code>, which is
equivalent to <code>(?:&lt;=[fF])(['&quot;])</code> in Perl regular expressions (see <code>:h \@&lt;=</code>).
The second line just handles the case of a docstring.</p>
<p>The string will end how it starts, so we can just reference the captured group
using <code>\z1</code> (we need to prefix it with <code>z</code> because it is an external pattern,
see <code>:h \z(</code>).</p>
<p>The <code>matchgroup</code> argument tells Vim which highlight group it should use to
highlight the start/end pattern. The group <code>pythonQuotes</code> come from the default
syntax file.</p>
<h1>
  Handling expressions inside f-strings
</h1>
<p>We also need to declare what this region contains.</p>
<p>For this we declare another region called <code>pythonInterpolation</code>, which starts
with &ldquo;{&rdquo; (but not with &ldquo;{{&rdquo;, which will actually produce a literal &ldquo;{&quot;) and
closes with &ldquo;}&rdquo;. With that in mind, we use the regex <code>{{\@!</code> because we don&rsquo;t
want a match if the preceding token is present (see <code>:h \@!</code>).</p>
<p>This region may contain only expressions, so stuff like a function declaration
does not make sense (notice there is a syntax for that, <code>:helpgrep ALLBUT</code>)</p>
<h1>
  Handling string modifiers
</h1>
<p>f-strings supports
<a href="https://docs.python.org/3/library/string.html#format-examples"><code>str.format</code> syntax</a>
for formatting, for example:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="kn">import</span> <span class="nn">math</span>
<span class="nb">print</span><span class="p">(</span><span class="sa">f</span><span class="s2">&#34;The value of pi is approximately </span><span class="si">{</span><span class="n">math</span><span class="o">.</span><span class="n">pi</span><span class="si">:</span><span class="s2">.3f</span><span class="si">}</span><span class="s2">.&#34;</span><span class="p">)</span>
</code></pre></div><p>So I read the
<a href="https://docs.python.org/3/library/string.html#format-specification-mini-language">Python docs</a>
and wrote a regex based on it, but regexes are always easier to write than to
read so I wouldn&rsquo;t recommend you trying.</p>
<p>It&rsquo;s also possible to convert a value as if wrapping them in functions such as
<code>ascii()</code>, <code>repr()</code>, <code>str()</code> with <code>!a</code>, <code>!r</code>, <code>!s</code> respectively, so we need to
handle this also.</p>
<p>For this, I declared a syntax group with <code>:h syn-match</code> and pass the regexes
that should be used.</p>
<p>It should only be highlighted inside a <code>pythonInterpolation</code> so we take
advantage of the <code>containedin</code> argument (see <code>:h syn-containedin</code>).</p>
<h1>
  Highlighting declared groups
</h1>
<p>Finally, we link these new highlight groups with an appropriate/whichever you
like highlight group (see <code>:h hi-link</code> and <code>:h group-name</code>). I chose <code>String</code>
for f-strings and <code>PreProc</code> for modifiers. And it should work as expected.</p>

