# [Deploying a Flask app on a Heroku free dyno](https://phelipetls.github.io/posts/deploying-flask-app-on-heroku/)

October 11, 2020 · 3 min. read time

---

<p>tl;dr: Use
<a href="https://docs.pylonsproject.org/projects/waitress/en/latest/">waitress</a> instead
of <a href="https://gunicorn.org/">gunicorn</a></p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-diff" data-lang="diff"><span class="gh">diff --git a/Procfile b/Procfile
</span><span class="gh">index d49e1a0..0cd38da 100644
</span><span class="gh"></span><span class="gd">--- a/Procfile
</span><span class="gd"></span><span class="gi">+++ b/Procfile
</span><span class="gi"></span><span class="gu">@@ -1 +1 @@
</span><span class="gu"></span><span class="gd">-web: gunicorn &#34;app:create_app()&#34;
</span><span class="gd"></span><span class="gi">+web: waitress-serve --port=$PORT --threads=${WEB_CONCURRENCY:-2} --call &#39;app:create_app&#39;
</span></code></pre></div><p>Recently, I had trouble deploying a Flask application using gunicorn as the WSGI
server on a Heroku&rsquo;s free dyno tier.</p>
<p>The problem boils down to the application not restarting when the dyno is
unidling, so once it sleeps it never wakes up again, unless you force it to do
so with <code>heroku restart</code>.</p>
<p>From the <code>heroku logs</code>:</p>
<pre><code>2020-08-27T19:21:21.060020+00:00 heroku[web.1]: State changed from down to starting
2020-08-27T19:21:26.527757+00:00 heroku[web.1]: Starting process with command `gunicorn &quot;app:create_app()&quot;`
2020-08-27T19:21:34.069516+00:00 app[web.1]: [2020-08-27 19:21:34 +0000] [4] [INFO] Starting gunicorn 20.0.4
2020-08-27T19:21:34.087317+00:00 app[web.1]: [2020-08-27 19:21:34 +0000] [4] [INFO] Listening at: http://0.0.0.0:3906 (4)
2020-08-27T19:21:34.092921+00:00 app[web.1]: [2020-08-27 19:21:34 +0000] [4] [INFO] Using worker: sync
2020-08-27T19:21:34.131957+00:00 app[web.1]: [2020-08-27 19:21:34 +0000] [10] [INFO] Booting worker with pid: 10
2020-08-27T19:21:34.201582+00:00 app[web.1]: [2020-08-27 19:21:34 +0000] [11] [INFO] Booting worker with pid: 11
2020-08-27T19:21:34.560508+00:00 heroku[web.1]: State changed from starting to up
2020-08-27T19:54:54.137845+00:00 heroku[web.1]: Idling
2020-08-27T19:54:54.139855+00:00 heroku[web.1]: State changed from up to down
2020-08-27T19:54:59.841651+00:00 heroku[web.1]: Stopping all processes with SIGTERM
2020-08-27T19:54:59.908237+00:00 app[web.1]: [2020-08-27 19:54:59 +0000] [11] [INFO] Worker exiting (pid: 11)
2020-08-27T19:54:59.910662+00:00 app[web.1]: [2020-08-27 19:54:59 +0000] [4] [INFO] Handling signal: term
2020-08-27T19:54:59.919059+00:00 app[web.1]: [2020-08-27 19:54:59 +0000] [10] [INFO] Worker exiting (pid: 10)
2020-08-27T19:55:00.122579+00:00 app[web.1]: [2020-08-27 19:55:00 +0000] [4] [INFO] Shutting down: Master
2020-08-27T19:55:00.223868+00:00 heroku[web.1]: Process exited with status 0
</code></pre>
<p>Every request would then be met with a Heroku <code>H10</code> error and 503 HTTP error.</p>
<p>I simply had this in my <code>Procfile</code>:</p>
<pre><code>web: gunicorn &quot;app:create_app()&quot;
</code></pre>
<p>I don&rsquo;t know if there&rsquo;s anything wrong with it or if I could have done something
to make it restart when unidling. Please let me know if that&rsquo;s the case.</p>
<p>By comparing with a node application log, the difference seems to be on how the
processes handle a <code>SIGTERM</code> signal. <code>node</code> exits with code 143 and restarts
just fine afterwards, but <code>gunicorn</code> exits with code 0 and doesn&rsquo;t restart
again.</p>
<p>I searched for a way to configure how gunicorn handles SIGTERM with no luck, but
that would be too awkward anyway.</p>
<p>Then I stumbled upon
<a href="https://blog.etianen.com/blog/2014/01/19/gunicorn-heroku-django/">a post discouraging the use of gunicorn on Heroku</a>
and recommending
<a href="https://docs.pylonsproject.org/projects/waitress/en/latest/">Waitress</a> instead.</p>
<p>The mentioned blog post author&rsquo;s reasons are much more technical than mine, I
just wanted the application to not crash. So I changed the Procfile to:</p>
<pre><code>web: waitress-serve --port=$PORT --threads=${WEB_CONCURRENCY:-2} --call 'app:create_app'
</code></pre>
<p>As was suggested by the
<a href="https://flask.palletsprojects.com/en/1.1.x/tutorial/deploy/#run-with-a-production-server">Flask</a>
and
<a href="https://docs.pylonsproject.org/projects/waitress/en/latest/usage.html#heroku">Waitress documentation</a></p>
<p>Now the application restarts when unidling:</p>
<pre><code>2020-10-09T02:02:24.121855+00:00 heroku[web.1]: Idling
2020-10-09T02:02:24.123702+00:00 heroku[web.1]: State changed from up to down
2020-10-09T02:02:25.226026+00:00 heroku[web.1]: Stopping all processes with SIGTERM
2020-10-09T02:02:25.317332+00:00 heroku[web.1]: Process exited with status 143
2020-10-09T13:22:44.966887+00:00 heroku[web.1]: Unidling
2020-10-09T13:22:44.969344+00:00 heroku[web.1]: State changed from down to starting
2020-10-09T13:22:49.127433+00:00 heroku[web.1]: Starting process with command `waitress-serve --port=55574 --threads=${WEB_CONCURRENCY:-2} --call 'app:create_app'`
</code></pre>

