# [Improving the Android Studio experience in dwm](https://phelipetls.github.io/posts/improving-the-android-studio-experience-in-dwm/)

January 25, 2022 · 7 min. read time

---

<p>In this post, I want to share how I started to change <a href="dwm.suckless.org/">dwm</a>
source code in order to improve my experience with Android Emulator.</p>
<p>First, let me briefly explain the problem. When you launch Android Emulator, a
window with the Android device and a window with buttons to control it appear
(maybe a modal window saying &ldquo;Loading state&hellip;&rdquo; too).</p>
<p>The device window is usually the one I&rsquo;m mostly interested in. I don&rsquo;t recall
ever wanting to focus the other ones (except by interacting with the mouse) and
I don&rsquo;t want them to show up in the taskbar (since I use the
<a href="https://dwm.suckless.org/patches/awesomebar/"><code>awesomebar</code></a> patch).</p>
<p>At first, I went in and modified the source code to ignore these windows by
their <code>WM_NAME</code> properties, which is easy to find out with <code>xprop</code>. But these
windows are very badly named and their names are not very distinct from the
device window.</p>
<p>Later I learned that these other windows are <a href="https://en.wikipedia.org/wiki/Transient_(computer_programming)"><em>transient
windows</em></a> in
X11:</p>
<blockquote>
<p>A window is said to be transient for another window if it belongs to that
other window and may not outlast it: a dialog box, such as an alert message,
is a common example.</p>
</blockquote>
<p>These windows have a property called
<a href="https://tronche.com/gui/x/icccm/sec-4.html#WM_TRANSIENT_FOR"><code>WM_TRANSIENT_FOR</code></a>,
whose value we can get with an Xlib function named
<a href="https://tronche.com/gui/x/xlib/ICC/client-to-window-manager/XGetTransientForHint.html"><code>XGetTransientForHint</code></a>.</p>
<p>Here&rsquo;s an example on how to use this function, taken from the <a href="https://git.suckless.org/dwm/file/dwm.c.html#l1038"><code>dwm</code> source
code</a>:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-c" data-lang="c"><span class="kt">void</span>
<span class="nf">manage</span><span class="p">(</span><span class="n">Window</span> <span class="n">w</span><span class="p">,</span> <span class="n">XWindowAttributes</span> <span class="o">*</span><span class="n">wa</span><span class="p">)</span>
<span class="p">{</span>
<span class="hl">	<span class="n">Client</span> <span class="o">*</span><span class="n">c</span><span class="p">,</span> <span class="o">*</span><span class="n">t</span> <span class="o">=</span> <span class="nb">NULL</span><span class="p">;</span>
</span><span class="hl">	<span class="n">Window</span> <span class="n">trans</span> <span class="o">=</span> <span class="n">None</span><span class="p">;</span>
</span>
	<span class="c1">// ...
</span><span class="c1"></span>
<span class="hl">	<span class="k">if</span> <span class="p">(</span><span class="n">XGetTransientForHint</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">w</span><span class="p">,</span> <span class="o">&amp;</span><span class="n">trans</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="n">t</span> <span class="o">=</span> <span class="n">wintoclient</span><span class="p">(</span><span class="n">trans</span><span class="p">)))</span> <span class="p">{</span>
</span><span class="hl">		<span class="n">c</span><span class="o">-&gt;</span><span class="n">mon</span> <span class="o">=</span> <span class="n">t</span><span class="o">-&gt;</span><span class="n">mon</span><span class="p">;</span>
</span><span class="hl">		<span class="n">c</span><span class="o">-&gt;</span><span class="n">tags</span> <span class="o">=</span> <span class="n">t</span><span class="o">-&gt;</span><span class="n">tags</span><span class="p">;</span>
</span>	<span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
		<span class="c1">// ...
</span><span class="c1"></span>	<span class="p">}</span>
<span class="p">}</span>
</code></pre></div><p>As you can see, it&rsquo;s pretty simple, <code>XGetTransientForHint</code> assigns a <code>Window</code>
to the <code>trans</code> variable (if it succeeds), and then we get the respective
<code>Client</code> with the <code>wintoclient</code> function.</p>
<p>This example provided me with enough knowledge to solve most of my problems:</p>
<ul>
<li>I don&rsquo;t want them in the taskbar.</li>
<li>I don&rsquo;t want them in the monocle layout count.</li>
<li>I never want to focus them with the keyboard.</li>
<li>When I apply the nth tag to the leader window, the same tag should be applied
to its transient windows.</li>
<li>On floating layout, if I focus on a leader window, I want its transient
windows to be raised into view as well.</li>
</ul>
<h1>
  Skipping transient windows in the taskbar
</h1>
<p>The taskbar is drawn by the <code>drawbar</code> function.</p>
<p>I just need to check if a window is transient and, if so, skip:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-c" data-lang="c"><span class="kt">void</span>
<span class="nf">drawbar</span><span class="p">(</span><span class="n">Monitor</span> <span class="o">*</span><span class="n">m</span><span class="p">)</span>
<span class="p">{</span>
	<span class="c1">// ...
</span><span class="c1"></span>	<span class="n">Client</span> <span class="o">*</span><span class="n">c</span><span class="p">,</span> <span class="o">*</span><span class="n">t</span> <span class="o">=</span> <span class="nb">NULL</span><span class="p">;</span>
	<span class="n">Window</span> <span class="n">trans</span><span class="p">;</span>

	<span class="c1">// ...
</span><span class="c1"></span>	<span class="k">for</span> <span class="p">(</span><span class="n">c</span> <span class="o">=</span> <span class="n">m</span><span class="o">-&gt;</span><span class="n">clients</span><span class="p">;</span> <span class="n">c</span><span class="p">;</span> <span class="n">c</span> <span class="o">=</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">next</span><span class="p">)</span> <span class="p">{</span>
<span class="hl">		<span class="k">if</span> <span class="p">(</span><span class="n">ISVISIBLE</span><span class="p">(</span><span class="n">c</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="n">XGetTransientForHint</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">win</span><span class="p">,</span> <span class="o">&amp;</span><span class="n">trans</span><span class="p">))</span>
</span><span class="hl">			<span class="n">n</span><span class="o">++</span><span class="p">;</span>
</span>		<span class="c1">// ...
</span><span class="c1"></span>	<span class="p">}</span>

	<span class="c1">// ...
</span><span class="c1"></span>
	<span class="k">if</span> <span class="p">((</span><span class="n">w</span> <span class="o">=</span> <span class="n">m</span><span class="o">-&gt;</span><span class="n">ww</span> <span class="o">-</span> <span class="n">sw</span> <span class="o">-</span> <span class="n">stw</span> <span class="o">-</span> <span class="n">x</span><span class="p">)</span> <span class="o">&gt;</span> <span class="n">bh</span><span class="p">)</span> <span class="p">{</span>
		<span class="k">if</span> <span class="p">(</span><span class="n">n</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
			<span class="c1">// ...
</span><span class="c1"></span>			<span class="k">for</span> <span class="p">(</span><span class="n">c</span> <span class="o">=</span> <span class="n">m</span><span class="o">-&gt;</span><span class="n">clients</span><span class="p">;</span> <span class="n">c</span><span class="p">;</span> <span class="n">c</span> <span class="o">=</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">next</span><span class="p">)</span> <span class="p">{</span>
<span class="hl">				<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="n">ISVISIBLE</span><span class="p">(</span><span class="n">c</span><span class="p">)</span> <span class="o">||</span> <span class="n">XGetTransientForHint</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">win</span><span class="p">,</span> <span class="o">&amp;</span><span class="n">trans</span><span class="p">))</span>
</span><span class="hl">					<span class="k">continue</span><span class="p">;</span>
</span>				<span class="k">if</span> <span class="p">(</span><span class="n">m</span><span class="o">-&gt;</span><span class="n">sel</span> <span class="o">==</span> <span class="n">c</span><span class="p">)</span>
					<span class="n">scm</span> <span class="o">=</span> <span class="n">SchemeSel</span><span class="p">;</span>
				<span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="n">HIDDEN</span><span class="p">(</span><span class="n">c</span><span class="p">))</span>
					<span class="n">scm</span> <span class="o">=</span> <span class="n">SchemeHid</span><span class="p">;</span>
				<span class="k">else</span>
					<span class="n">scm</span> <span class="o">=</span> <span class="n">SchemeNorm</span><span class="p">;</span>
				<span class="n">drw_setscheme</span><span class="p">(</span><span class="n">drw</span><span class="p">,</span> <span class="n">scheme</span><span class="p">[</span><span class="n">scm</span><span class="p">]);</span>
				<span class="c1">// ...
</span><span class="c1"></span>			<span class="p">}</span>
		<span class="c1">// ...
</span><span class="c1"></span>		<span class="p">}</span>
	<span class="p">}</span>
	<span class="c1">// ...
</span><span class="c1"></span><span class="p">}</span>
</code></pre></div><p>We need to be careful here and also change the <code>buttonpress</code> function, which
handles clicks in the taskbar:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-diff" data-lang="diff"><span class="gh">diff --git a/dwm.c b/dwm.c
</span><span class="gh"></span><span class="gd">--- a/dwm.c
</span><span class="gd"></span><span class="gi">+++ b/dwm.c
</span><span class="gi"></span><span class="gu">@@ -518,6 +518,7 @@ buttonpress(XEvent *e)
</span><span class="gu"></span>	Client *c;
	Monitor *m;
	XButtonPressedEvent *ev = &amp;e-&gt;xbutton;
<span class="gi">+	Window trans = None;
</span><span class="gi"></span> 
	click = ClkRootWin;
	/* focus monitor if necessary */
<span class="gu">@@ -546,7 +547,7 @@ buttonpress(XEvent *e)
</span><span class="gu"></span> 
			if (c) {
				do {
<span class="gd">-					if (!ISVISIBLE(c))
</span><span class="gd"></span><span class="gi">+					if (!ISVISIBLE(c) || XGetTransientForHint(dpy, c-&gt;win, &amp;trans))
</span><span class="gi"></span>						continue;
					else
						x += (1.0 / (double)m-&gt;bt) * m-&gt;btw;
</code></pre></div><p>Later, by investigating <code>xprop</code> output, I found that some windows give a hint
called <code>_NET_WM_STATE_SKIP_TASKBAR</code> so window managers shouldn&rsquo;t include them
in the taskbar, this seemed like a better idea too so <a href="https://github.com/phelipetls/dotfiles/commit/7333e85b50abc63da0193705d204cf40c19b63bc">I implemented it as
well</a>.</p>
<h1>
  Skipping transient windows in monocle layout count
</h1>
<p>This is simple, we just need to <em>not</em> increment a counter when the window is
transient, in the <code>monocle</code> function:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-c" data-lang="c"><span class="kt">void</span>
<span class="nf">monocle</span><span class="p">(</span><span class="n">Monitor</span> <span class="o">*</span><span class="n">m</span><span class="p">)</span>
<span class="p">{</span>
	<span class="kt">unsigned</span> <span class="kt">int</span> <span class="n">n</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span>
<span class="hl">	<span class="n">Client</span> <span class="o">*</span><span class="n">c</span><span class="p">;</span>
</span><span class="hl">	<span class="n">Window</span> <span class="n">trans</span><span class="p">;</span>
</span>
	<span class="k">for</span> <span class="p">(</span><span class="n">c</span> <span class="o">=</span> <span class="n">m</span><span class="o">-&gt;</span><span class="n">clients</span><span class="p">;</span> <span class="n">c</span><span class="p">;</span> <span class="n">c</span> <span class="o">=</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">next</span><span class="p">)</span>
<span class="hl">		<span class="k">if</span> <span class="p">(</span><span class="n">ISVISIBLE</span><span class="p">(</span><span class="n">c</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="n">XGetTransientForHint</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">win</span><span class="p">,</span> <span class="o">&amp;</span><span class="n">trans</span><span class="p">))</span>
</span><span class="hl">			<span class="n">n</span><span class="o">++</span><span class="p">;</span>
</span>	<span class="k">if</span> <span class="p">(</span><span class="n">n</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="cm">/* override layout symbol */</span>
		<span class="n">snprintf</span><span class="p">(</span><span class="n">m</span><span class="o">-&gt;</span><span class="n">ltsymbol</span><span class="p">,</span> <span class="k">sizeof</span> <span class="n">m</span><span class="o">-&gt;</span><span class="n">ltsymbol</span><span class="p">,</span> <span class="s">&#34;[%d]&#34;</span><span class="p">,</span> <span class="n">n</span><span class="p">);</span>
	<span class="c1">// ...
</span><span class="c1"></span><span class="p">}</span>
</code></pre></div><h1>
  Do not focus transient windows with <kbd>mod</kbd> + <kbd>j</kbd> and <kbd>mod</kbd> + <kbd>k</kbd>
</h1>
<p>I started by checking which function is bound to these keys in <code>config.h</code>: the
<code>focusstack</code> function.</p>
<p>Then it&rsquo;s quick to realize I just need to add another condition to the various
if statements (careful not to mix up the <code>i</code> and <code>c</code> variables):</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-diff" data-lang="diff"><span class="gh">diff --git a/suckless/dwm/dwm.c b/suckless/dwm/dwm.c
</span><span class="gh">index 86e4a41..852666b 100644
</span><span class="gh"></span><span class="gd">--- a/suckless/dwm/dwm.c
</span><span class="gd"></span><span class="gi">+++ b/suckless/dwm/dwm.c
</span><span class="gi"></span><span class="gu">@@ -1053,6 +1053,7 @@ void
</span><span class="gu"></span> focusstack(int inc, int hid)
 {
	Client *c = NULL, *i;
<span class="gi">+	Window trans = None;
</span><span class="gi"></span> 
	if (!selmon-&gt;sel &amp;&amp; !hid)
		return;
<span class="gu">@@ -1062,22 +1063,22 @@ focusstack(int inc, int hid)
</span><span class="gu"></span>	if (inc &gt; 0) {
		if (selmon-&gt;sel)
			for (c = selmon-&gt;sel-&gt;next;
<span class="gd">-					 c &amp;&amp; (!ISVISIBLE(c) || (!hid &amp;&amp; HIDDEN(c)));
</span><span class="gd"></span><span class="gi">+					 c &amp;&amp; (!ISVISIBLE(c) || (!hid &amp;&amp; HIDDEN(c)) || XGetTransientForHint(dpy, c-&gt;win, &amp;trans));
</span><span class="gi"></span>					 c = c-&gt;next);
		if (!c)
			for (c = selmon-&gt;clients;
<span class="gd">-					 c &amp;&amp; (!ISVISIBLE(c) || (!hid &amp;&amp; HIDDEN(c)));
</span><span class="gd"></span><span class="gi">+					 c &amp;&amp; (!ISVISIBLE(c) || (!hid &amp;&amp; HIDDEN(c)) || XGetTransientForHint(dpy, c-&gt;win, &amp;trans));
</span><span class="gi"></span>					 c = c-&gt;next);
	} else {
		if (selmon-&gt;sel) {
			for (i = selmon-&gt;clients; i != selmon-&gt;sel; i = i-&gt;next)
<span class="gd">-				if (ISVISIBLE(i) &amp;&amp; !(!hid &amp;&amp; HIDDEN(i)))
</span><span class="gd"></span><span class="gi">+				if (ISVISIBLE(i) &amp;&amp; !(!hid &amp;&amp; HIDDEN(i)) &amp;&amp; !XGetTransientForHint(dpy, i-&gt;win, &amp;trans))
</span><span class="gi"></span>					c = i;
		} else
			c = selmon-&gt;clients;
		if (!c)
			for (; i; i = i-&gt;next)
<span class="gd">-				if (ISVISIBLE(i) &amp;&amp; !(!hid &amp;&amp; HIDDEN(i)))
</span><span class="gd"></span><span class="gi">+				if (ISVISIBLE(i) &amp;&amp; !(!hid &amp;&amp; HIDDEN(i)) &amp;&amp; !XGetTransientForHint(dpy, i-&gt;win, &amp;trans))
</span><span class="gi"></span>					c = i;
	}
</code></pre></div><h1>
  Applying nth tag to a leader window&rsquo;s transient windows
</h1>
<p>To achieve this, I also started by checking which function is bound to
<kbd>Mod</kbd> + <kbd>Shift</kbd> + <kbd>n</kbd> in <code>config.h</code>, which is the
<code>tag</code> function.</p>
<p>Then I modified it to apply the same tag to all transient windows whose window
leader is the selected client:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-c" data-lang="c"><span class="kt">void</span>
<span class="nf">tag</span><span class="p">(</span><span class="k">const</span> <span class="n">Arg</span> <span class="o">*</span><span class="n">arg</span><span class="p">)</span>
<span class="p">{</span>
	<span class="n">Client</span> <span class="o">*</span><span class="n">c</span><span class="p">,</span> <span class="o">*</span><span class="n">t</span> <span class="o">=</span> <span class="nb">NULL</span><span class="p">;</span>
	<span class="n">Window</span> <span class="n">trans</span> <span class="o">=</span> <span class="n">None</span><span class="p">;</span>

	<span class="k">if</span> <span class="p">(</span><span class="n">selmon</span><span class="o">-&gt;</span><span class="n">sel</span> <span class="o">&amp;&amp;</span> <span class="n">arg</span><span class="o">-&gt;</span><span class="n">ui</span> <span class="o">&amp;</span> <span class="n">TAGMASK</span><span class="p">)</span> <span class="p">{</span>
		<span class="n">selmon</span><span class="o">-&gt;</span><span class="n">sel</span><span class="o">-&gt;</span><span class="n">tags</span> <span class="o">=</span> <span class="n">arg</span><span class="o">-&gt;</span><span class="n">ui</span> <span class="o">&amp;</span> <span class="n">TAGMASK</span><span class="p">;</span>

<span class="hl">		<span class="k">for</span> <span class="p">(</span><span class="n">c</span> <span class="o">=</span> <span class="n">selmon</span><span class="o">-&gt;</span><span class="n">stack</span><span class="p">;</span> <span class="n">c</span><span class="p">;</span> <span class="n">c</span> <span class="o">=</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">snext</span><span class="p">)</span> <span class="p">{</span>
</span><span class="hl">			<span class="k">if</span> <span class="p">(</span><span class="n">XGetTransientForHint</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">win</span><span class="p">,</span> <span class="o">&amp;</span><span class="n">trans</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="n">t</span> <span class="o">=</span> <span class="n">wintoclient</span><span class="p">(</span><span class="n">trans</span><span class="p">)))</span> <span class="p">{</span>
</span><span class="hl">				<span class="k">if</span> <span class="p">(</span><span class="n">selmon</span><span class="o">-&gt;</span><span class="n">sel</span> <span class="o">==</span> <span class="n">t</span><span class="p">)</span> <span class="p">{</span>
</span><span class="hl">					<span class="n">c</span><span class="o">-&gt;</span><span class="n">tags</span> <span class="o">=</span> <span class="n">arg</span><span class="o">-&gt;</span><span class="n">ui</span> <span class="o">&amp;</span> <span class="n">TAGMASK</span><span class="p">;</span>
</span><span class="hl">				<span class="p">}</span>
</span><span class="hl">			<span class="p">}</span>
</span><span class="hl">		<span class="p">}</span>
</span>
		<span class="n">focus</span><span class="p">(</span><span class="nb">NULL</span><span class="p">);</span>
		<span class="n">arrange</span><span class="p">(</span><span class="n">selmon</span><span class="p">);</span>
	<span class="p">}</span>
<span class="p">}</span>
</code></pre></div><h1>
  Raising all transient windows when the leader window gets focused
</h1>
<p>Since the transient windows do not appear in the taskbar and we also ignore
them in the <code>focusstack</code> function, there is no way to focus on them if they&rsquo;re
not visible on the screen.</p>
<p>So in floating layout there&rsquo;s an usability problem: transient windows are never
visible.</p>
<p>The fix is to raise all transient windows when a window gets focused. Also,
if a transient window gets focused in a non-floating layout, we should raise it
as well since transient windows are always floating in dwm). Here&rsquo;s the code:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-diff" data-lang="diff"><span class="gh">diff --git a/suckless/dwm/dwm.c b/suckless/dwm/dwm.c
</span><span class="gh">index 389c61d..70a6dc1 100644
</span><span class="gh"></span><span class="gd">--- a/suckless/dwm/dwm.c
</span><span class="gd"></span><span class="gi">+++ b/suckless/dwm/dwm.c
</span><span class="gi"></span><span class="gu">@@ -1001,6 +1001,9 @@ expose(XEvent *e)
</span><span class="gu"></span> void
 focus(Client *c)
 {
<span class="gi">+	Client *i, *t;
</span><span class="gi">+	Window trans = None;
</span><span class="gi">+
</span><span class="gi"></span> 	if (!c || !ISVISIBLE(c))
 		for (c = selmon-&gt;stack; c &amp;&amp; (!ISVISIBLE(c) || HIDDEN(c)); c = c-&gt;snext);
 	if (selmon-&gt;sel &amp;&amp; selmon-&gt;sel != c) {
<span class="gu">@@ -1023,6 +1026,12 @@ focus(Client *c)
</span><span class="gu"></span> 		grabbuttons(c, 1);
 		XSetWindowBorder(dpy, c-&gt;win, scheme[SchemeSel][ColBorder].pixel);
 		setfocus(c);

<span class="gi">+		if (XGetTransientForHint(dpy, c-&gt;win, &amp;trans)) {
</span><span class="gi">+			XRaiseWindow(dpy, c-&gt;win);
</span><span class="gi">+		}
</span><span class="gi">+
</span><span class="gi">+		for (i = selmon-&gt;stack; i; i = i-&gt;snext) {
</span><span class="gi">+			if (ISVISIBLE(i) &amp;&amp; (XGetTransientForHint(dpy, i-&gt;win, &amp;trans) &amp;&amp; (t = wintoclient(trans)) &amp;&amp; (t == c))) {
</span><span class="gi">+				XRaiseWindow(dpy, i-&gt;win);
</span><span class="gi">+			}
</span><span class="gi">+		}
</span><span class="gi"></span> 	} else {
 		XSetInputFocus(dpy, root, RevertToPointerRoot, CurrentTime);
 		XDeleteProperty(dpy, root, netatom[NetActiveWindow]);
</code></pre></div><p>This create another problem though&hellip; When the leader window gets unfocused,
their transient windows would always reamin on top of everything else!</p>
<p>Thanks to <a href="https://www.reddit.com/r/dwm/comments/sctdxt/comment/huaveje">a comment by
/u/bakkeby</a>, I
found out that I could use
<a href="https://tronche.com/gui/x/xlib/window/XLowerWindow.html"><code>XLowerWindow</code></a> in
the <code>unfocus</code> function to fix this:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-c" data-lang="c"><span class="kt">void</span>
<span class="nf">unfocus</span><span class="p">(</span><span class="n">Client</span> <span class="o">*</span><span class="n">c</span><span class="p">,</span> <span class="kt">int</span> <span class="n">setfocus</span><span class="p">)</span>
<span class="p">{</span>
	<span class="n">Client</span> <span class="o">*</span><span class="n">i</span><span class="p">,</span> <span class="o">*</span><span class="n">t</span><span class="p">;</span>
	<span class="n">Window</span> <span class="n">trans</span> <span class="o">=</span> <span class="n">None</span><span class="p">;</span>

	<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="n">c</span><span class="p">)</span>
		<span class="k">return</span><span class="p">;</span>
	<span class="n">grabbuttons</span><span class="p">(</span><span class="n">c</span><span class="p">,</span> <span class="mi">0</span><span class="p">);</span>
	<span class="n">XSetWindowBorder</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">win</span><span class="p">,</span> <span class="n">scheme</span><span class="p">[</span><span class="n">SchemeNorm</span><span class="p">][</span><span class="n">ColBorder</span><span class="p">].</span><span class="n">pixel</span><span class="p">);</span>

<span class="hl">	<span class="k">if</span> <span class="p">(</span><span class="n">XGetTransientForHint</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">win</span><span class="p">,</span> <span class="o">&amp;</span><span class="n">trans</span><span class="p">))</span>
</span><span class="hl">		<span class="n">XLowerWindow</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">win</span><span class="p">);</span>
</span><span class="hl">
</span><span class="hl">	<span class="k">for</span> <span class="p">(</span><span class="n">i</span> <span class="o">=</span> <span class="n">c</span><span class="o">-&gt;</span><span class="n">mon</span><span class="o">-&gt;</span><span class="n">stack</span><span class="p">;</span> <span class="n">i</span><span class="p">;</span> <span class="n">i</span> <span class="o">=</span> <span class="n">i</span><span class="o">-&gt;</span><span class="n">snext</span><span class="p">)</span> <span class="p">{</span>
</span><span class="hl">		<span class="k">if</span> <span class="p">(</span><span class="n">ISVISIBLE</span><span class="p">(</span><span class="n">i</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="n">XGetTransientForHint</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">i</span><span class="o">-&gt;</span><span class="n">win</span><span class="p">,</span> <span class="o">&amp;</span><span class="n">trans</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="n">t</span> <span class="o">=</span> <span class="n">wintoclient</span><span class="p">(</span><span class="n">trans</span><span class="p">))</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="n">t</span> <span class="o">==</span> <span class="n">c</span><span class="p">)))</span> <span class="p">{</span>
</span><span class="hl">			<span class="n">XLowerWindow</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">i</span><span class="o">-&gt;</span><span class="n">win</span><span class="p">);</span>
</span><span class="hl">		<span class="p">}</span>
</span><span class="hl">	<span class="p">}</span>
</span>
	<span class="k">if</span> <span class="p">(</span><span class="n">setfocus</span><span class="p">)</span> <span class="p">{</span>
		<span class="n">XSetInputFocus</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">root</span><span class="p">,</span> <span class="n">RevertToPointerRoot</span><span class="p">,</span> <span class="n">CurrentTime</span><span class="p">);</span>
		<span class="n">XDeleteProperty</span><span class="p">(</span><span class="n">dpy</span><span class="p">,</span> <span class="n">root</span><span class="p">,</span> <span class="n">netatom</span><span class="p">[</span><span class="n">NetActiveWindow</span><span class="p">]);</span>
	<span class="p">}</span>
<span class="p">}</span>
</code></pre></div><p><strong>Warning</strong>: this is pretty cutting-edge and coming from a person with
no expertise in C, so it might be broken in several ways. I&rsquo;m just messing
around.</p>
<h1>
  Final result
</h1>
<p>Here&rsquo;s a demonstration of the final result:</p>
<video controls width="100%">
  <source src="./demo.mp4" type="video/mp4">
</video>
