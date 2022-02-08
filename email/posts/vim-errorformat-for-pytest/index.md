# [A Vim errorformat for pytest](https://phelipetls.github.io/posts/vim-errorformat-for-pytest/)

October 07, 2020 · 7 min. read time

---

<blockquote>
<p>Ah, errorformat, the feature everybody loves to hate. :) &ndash; lcd047, on
<a href="https://stackoverflow.com/a/29102995">Stack Overflow</a></p>
</blockquote>
<p>I really like Vim&rsquo;s <code>:h errorformat</code> feature, but only when I manage to get it
right. Until then, I&rsquo;m sure it will frustrate me more than once. It&rsquo;s very
awkward to write one if the program&rsquo;s output you&rsquo;re trying to capture is not
trivial (e.g., <code>LaTeX</code>).</p>
<p>Recently, I committed to get it right for <code>pytest</code>. The cli allows customizing
how tracebacks are shown with the <code>--tb</code> option, e.g., <code>pytest --tb=short</code>, and
to control verbosity level with <code>-v</code>, <code>-vv</code> and <code>-q</code>. I went with
<code>pytest --tb=short -vv</code>.</p>
<p>To run pytest in Vim I then put this line in a <code>:h compiler</code> plugin (see
<code>:h write-compiler-plugin</code>):</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vim" data-lang="vim">    <span class="nx">CompilerSet</span> <span class="nx">makeprg</span><span class="p">=</span><span class="nx">pytest</span>\ <span class="p">--</span><span class="nx">tb</span><span class="p">=</span><span class="nx">short</span>\ <span class="p">-</span><span class="nx">vv</span>\ $*\ %<span class="err">
</span></code></pre></div><p>So that I can run <code>pytest</code> with <code>:make</code> or even with more arguments with
<code>:make -k mytest</code>, which will replace the token <code>$*</code>.</p>
<p>It outputs something like this:</p>
<pre><code>============================= test session starts ==============================
platform linux -- Python 3.7.5, pytest-5.3.4, py-1.8.1, pluggy-0.13.1 -- /usr/bin/python3
cachedir: .pytest_cache
rootdir: /home/phelipe/Documentos/python/tests
plugins: cov-2.8.1
collecting ... collected 3 items

test_assert2.py::test_zero_division FAILED                               [ 33%]
test_assert2.py::test_recursion_depth FAILED                             [ 66%]
test_assert2.py::test_set_comparison FAILED                              [100%]

=================================== FAILURES ===================================
______________________________ test_zero_division ______________________________
test_assert2.py:5: in test_zero_division
    assert 1 / 0
E   ZeroDivisionError: division by zero
_____________________________ test_recursion_depth _____________________________
test_assert2.py:15: in test_recursion_depth
    f()
test_assert2.py:12: in f
    f()
test_assert2.py:12: in f
    f()
E   RecursionError: maximum recursion depth exceeded
!!! Recursion detected (same locals &amp; position)
_____________________________ test_set_comparison ______________________________
test_assert2.py:22: in test_set_comparison
    assert set1 == set2
E   AssertionError: assert {'3', '8', '1', '0'} == {'3', '8', '0', '5'}
E     Extra items in the left set:
E     '1'
E     Extra items in the right set:
E     '5'
E     Full diff:
E     - {'3', '8', '1', '0'}
E     ?            -----
E     + {'3', '8', '0', '5'}
E     ?               +++++
============================== 3 failed in 0.03s ===============================
</code></pre>
<p>Now, for the difficult part.</p>
<h1>
  Writing an errorformat
</h1>
<p>To make Vim understand these lines so that we can jump to each error, we must
give patterns. It will then go through every line testing against those
patterns. From <code>:h errorformat</code>:</p>
<blockquote>
<p>Error format strings are always parsed pattern by pattern until the first
match occurs.</p>
</blockquote>
<p>The order is, thus, important here.</p>
<p>Also, the pattern has to match the entire line. That is to say the pattern is
always implicitly surrounded by a <code>^</code> and <code>$</code>.</p>
<p>We will need to use <code>:h errorformat-multi-line</code> because a single error spans
multiple lines.</p>
<p>I found out that <code>pytest</code> gives inconsistent patterns depending on the error
(test failure, missing fixture and syntax error), so I had to handle them
separately.</p>
<h1>
  Handling test failures
</h1>
<p>A test failure starts like this:</p>
<pre><code>______________________________ TEST_NAME ______________________________
</code></pre>
<p>The pattern for this is <code>%E_%\\+\ %o\ _%\\+</code>. Notice the overwhelming number of
escape characters needed because I&rsquo;m passing the pattern as an option value,
like in <code>:set errorformat=%E_%\\+\ %o\ _%\\+</code> (see <code>:h option-backslash</code> to
understand).</p>
<p><code>%E</code> tells Vim how an error starts. <code>%o</code> matches a string and means <code>module</code> for
Vim (it&rsquo;s just useful to give more context, the test name will be shown in the
quickfix list in place of the file name).</p>
<p>The error then continues with</p>
<pre><code>/home/phelipe/test_py.py:5: in test_add
</code></pre>
<p>So we add the pattern <code>%C%f:%l:\ in\ %o</code>. Where <code>%f</code> is filename, <code>%l</code> is line
number and <code>%C</code> says that this a continuation line.</p>
<p>I&rsquo;m not really interested in capturing anything else. So I just give a pattern
that will match anything until the end pattern: <code>%C\ %.%#</code> (where <code>%.%#</code> is the
same as regular expression <code>.*</code>).</p>
<p>Now, I need to captura how a test failure ends:</p>
<pre><code>E   assert 3 == 1
</code></pre>
<p>A pattern for that may be <code>%ZE\ %\\{3}%m</code>. Where <code>%Z</code> is the token for end of
multi-line error.</p>
<p>I also want to filter out all the other lines that didn&rsquo;t match, except the ones
starting with E, so I include <code>%-G%[%^E]%.%#</code>. To also exclude empty lines also:
<code>%-G</code>.</p>
<p><code>%G</code> has the purpose to capture (when prefixed with <code>+</code>) or ignore (when
prefixed with <code>-</code>) &ldquo;general&rdquo; messages.</p>
<p>The quickfix list will then look like:</p>
<pre><code>test_zero_division|5|  ZeroDivisionError: division by zero
test_recursion_depth|15|  RecursionError: maximum recursion depth exceeded
test_set_comparison|22|  AssertionError: assert {'1', '0', '3', '8'} == {'0', '3', '8', '5'}
|| E     Extra items in the left set:
|| E     '1'
|| E     Extra items in the right set:
|| E     '5'
|| E     Full diff:
|| E     - {'1', '0', '3', '8'}
|| E     ?  -----
|| E     + {'0', '3', '8', '5'}
|| E     ?               +++++
</code></pre>
<p>So far, it will understand tests failures but not syntax errors, import errors
and fixture errors, which would fail silently. This is no good.</p>
<h1>
  Syntax errors
</h1>
<p>For syntax errors, we need to parse something like this:</p>
<pre><code>============================= test session starts ==============================
platform linux -- Python 3.7.5, pytest-5.3.4, py-1.8.1, pluggy-0.13.1 -- /usr/bin/python3
cachedir: .pytest_cache
rootdir: /home/phelipe/Documentos/python/tests
plugins: cov-2.8.1
collecting ... collected 0 items / 1 error

==================================== ERRORS ====================================
_______________________ ERROR collecting test_assert2.py _______________________
../../../.local/lib/python3.7/site-packages/_pytest/python.py:493: in _importtestmodule
    mod = self.fspath.pyimport(ensuresyspath=importmode)
../../../.local/lib/python3.7/site-packages/py/_path/local.py:701: in pyimport
    __import__(modname)
&lt;frozen importlib._bootstrap&gt;:983: in _find_and_load
    ???
&lt;frozen importlib._bootstrap&gt;:967: in _find_and_load_unlocked
    ???
&lt;frozen importlib._bootstrap&gt;:677: in _load_unlocked
    ???
../../../.local/lib/python3.7/site-packages/_pytest/assertion/rewrite.py:134: in exec_module
    source_stat, co = _rewrite_test(fn, self.config)
../../../.local/lib/python3.7/site-packages/_pytest/assertion/rewrite.py:319: in _rewrite_test
    tree = ast.parse(source, filename=fn)
/usr/lib/python3.7/ast.py:35: in parse
    return compile(source, filename, mode, PyCF_ONLY_AST)
E     File &quot;/home/phelipe/Documentos/python/tests/test_assert2.py&quot;, line 5
E       assert 1  0
E                 ^
E   SyntaxError: invalid syntax
!!!!!!!!!!!!!!!!!!!! Interrupted: 1 error during collection !!!!!!!!!!!!!!!!!!!!
=============================== 1 error in 0.09s ===============================
</code></pre>
<p>What matters starts with an E. So this <code>errorformat</code> does the job:</p>
<pre><code>%EE\ \ \ \ \ File\ \&quot;%f\&quot;\\,\ line\ %l,
%CE\ \ \ %p^,
%ZE\ \ \ %[%^\ ]%\\@=%m,
%CE\ %.%#,
</code></pre>
<p>The second line has the pattern <code>%p</code>, which matches a sequence of <code>[ -.]</code> to get
its length to later use as column number.</p>
<p>The end pattern <code>%ZE %[%^ ]%\@=%m</code> matches a line starting with E, three spaces
exactly, which is needed to distinguish it from the others, see <code>:h \@=</code>.</p>
<p>We also need to include a continuation format (any line starting with E and
space that didn&rsquo;t match the earlier ones).</p>
<h1>
  Import errors
</h1>
<p>Import errors are also slightly different:</p>
<pre><code>============================= test session starts ==============================
platform linux -- Python 3.7.5, pytest-5.3.4, py-1.8.1, pluggy-0.13.1 -- /usr/bin/python3
cachedir: .pytest_cache
rootdir: /home/phelipe
plugins: cov-2.8.1
collecting ... collected 0 items / 1 error

==================================== ERRORS ====================================
_________________________ ERROR collecting test_py.py __________________________
ImportError while importing test module '/home/phelipe/test_py.py'.
Hint: make sure your test modules/packages have valid Python names.
Traceback:
/home/phelipe/.local/lib/python3.7/site-packages/_pytest/python.py:493: in _importtestmodule
    mod = self.fspath.pyimport(ensuresyspath=importmode)
/home/phelipe/.local/lib/python3.7/site-packages/py/_path/local.py:701: in pyimport
    __import__(modname)
/home/phelipe/.local/lib/python3.7/site-packages/_pytest/assertion/rewrite.py:143: in exec_module
    exec(co, module.__dict__)
/home/phelipe/test_py.py:1: in &lt;module&gt;
    import pytes
E   ModuleNotFoundError: No module named 'pytes'
!!!!!!!!!!!!!!!!!!!! Interrupted: 1 error during collection !!!!!!!!!!!!!!!!!!!!
=============================== 1 error in 0.09s ===============================
</code></pre>
<p>It starts with <code>ImportError while...</code> so I included <code>%EImportError%.%#\'%f\'\.</code>
to capture the filename. It ends with an <code>E %m</code> and we already a pattern to
capture this. But we do need to tell how it continues, and it&rsquo;s fine to just put
something that would match anything like <code>%C%.%#</code>.</p>
<h1>
  Fixture errors
</h1>
<p>Fixture errors are also in a different format:</p>
<pre><code>_____________________ ERROR at setup of test_zero_division _____________________
file /home/phelipe/Documentos/python/tests/test_assert2.py, line 4
  def test_zero_division(oi):
E       fixture 'oi' not found
&gt;       available fixtures: cache, capfd, capfdbinary, caplog, capsys, capsysbinary, cov, doctest_namespace, monkeypatch, no_cover, pytestconfig, record_property, record_testsuite_property, re
cord_xml_attribute, recwarn, tmp_path, tmp_path_factory, tmpdir, tmpdir_factory
&gt;       use 'pytest --fixtures [testpath]' for help on them.
</code></pre>
<p>Which can be handled by:</p>
<pre><code>\%Efile\ %f\\,\ line\ %l,
\%+ZE\ %mnot\ found,
</code></pre>
<p>The line <code>%+ZE %.%#not found</code> means that the error will match <code>E .*not found</code>,
the preceding <code>+</code> will include the whole line as a message.</p>
<h1>
  Further improvements
</h1>
<p>Notice how syntax, import and fixture errors are preceded with something like</p>
<pre><code>______________________________ ERROR.* ______________________________
</code></pre>
<p>Which will match our pattern to catch the start of a test failure. There&rsquo;s an
easy fix for this, just put <code>%-G_%\\+\ ERROR%.%#\ _%\\+</code> before that pattern, so
it will ignore it first.</p>
<p>Also, if all tests passed, capture it too:</p>
<pre><code>  \%+G%[=]%\\+\ %*\\d\ passed%.%#,
</code></pre>
<h1>
  Conclusion
</h1>
<p>Check out the whole
<a href="https://github.com/phelipetls/dotfiles/blob/master/.config/nvim/compiler/pytest.vim">compiler plugin</a>
in my dotfiles repo.</p>
<p>It&rsquo;s tricky to figure out how to order the patterns, which I didn&rsquo;t risk to
explain here since I wouldn&rsquo;t say I fully understand how it works. It was mostly
by trial and error.</p>
<p>But be careful to not put more generic patterns first, because then they will
take precedence and the more specific ones will be ignored. At least, I did this
a lot.</p>
<p>If you&rsquo;re interested, I recommend reading the
<a href="https://stackoverflow.com/a/29102995">Stack Overflow answer</a> and, of course,
<code>:h errorformat</code>.</p>
<p>If you&rsquo;re commited to learn Vim, It&rsquo;s worth it to know about this in order to
integrate a command line program into Vim.</p>
