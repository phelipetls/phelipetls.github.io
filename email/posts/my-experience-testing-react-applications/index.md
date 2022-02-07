# [My experience testing React applications](https://phelipetls.github.io/posts/my-experience-testing-react-applications/)

April 28, 2021 · 4 min. read time

---

<p>Testing is not easy, it&rsquo;s a trade-off: either you slow down new feature
development by writing test to avoid regressions later, or you develop untested
features and bugs will inevitably be introduced later.</p>
<p>But I can understand how that ends up happening: we have to develop new features
fast and we don&rsquo;t have time for tests. It&rsquo;s not easy writing tests, but it&rsquo;s a
skill we have to develop. I try to do this with my side projects.</p>
<p>I started to write tests for my Python projects with the <code>unittest</code> and <code>pytest</code>
libraries. I wasn&rsquo;t very good at it as everything was new to me but I was
obsessed with getting a ~100% test coverage badge in the README so I persisted.
The benefits were obvious: I could refactor all I wanted later.</p>
<p>Sometimes tests got ugly because of all the mock/monkeypatch I needed to do to
make them isolated, which was annoying but it was worth it. It was usually a
seamless and rewarding experience.</p>
<p>But writing tests for React applications is a different beast &ndash; we&rsquo;re testing
user interfaces:</p>
<ul>
<li>Things change, often asynchronously, which means we need to wait for them to
appear or disappear.</li>
<li>We need to simulate user interactions.</li>
<li>There are a lot more network requests to mock, so it&rsquo;s harder to isolate.</li>
<li>Integration test are more useful than unit tests, so tests are more complex.</li>
<li>It&rsquo;s harder to debug (I didn&rsquo;t find an equivalent of <code>pytest --pdb</code>).</li>
<li>It&rsquo;s <strong>much slower</strong>.</li>
</ul>
<p>In this blog post I&rsquo;m going to talk about my experience with JavaScript
libraries for testing front-end web apps.</p>
<h1>
  <code>react-testing-library</code>
</h1>
<p>This library seems to be what everyone is using now, and I do see how that
happened. It has a very consistent API and good documentation.</p>
<p>I liked that:</p>
<ul>
<li>You can get elements on the screen with
<a href="https://testing-library.com/docs/queries/about/">queries that resembles the DOM API</a>.</li>
<li>You don&rsquo;t have to
<a href="https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#wrapping-things-in-act-unnecessarily">wrap anything in <code>act</code></a>.</li>
</ul>
<p>I disliked that:</p>
<ul>
<li>It was hard to debug (difficult to grasp the UI state from the output of
<code>screen.debug()</code>)</li>
<li>You have to
<a href="https://testing-library.com/docs/guide-disappearance">wait for appearance and disappearance explicitly</a>.</li>
<li>Requires some boilerplate to
<a href="(https://testing-library.com/docs/react-testing-library/setup/)">set up your tests</a>
(for example, to wrap some components in
<a href="https://reactrouter.com/web/api/MemoryRouter">MemoryRouter</a>, context
providers,
<a href="https://react-query.tanstack.com/reference/QueryClient">QueryClient</a>).</li>
<li>Your tests have to run in a node.js/jsdom environment, so (for example) if you
use canvas in your app,
<a href="https://github.com/jsdom/jsdom#canvas-support">it won&rsquo;t work out of the box</a>.</li>
</ul>
<p>But it got the job done most of the time.</p>
<p>I usually combined it with <code>nock</code> and <code>msw</code> for mocking network requests.</p>
<h1>
  <code>nock</code>
</h1>
<p>The <code>nock</code> library works in node-only environment and has a well-thought, easy
to use API.</p>
<p>In my experience, it has just a few unexpected issues like
<a href="https://www.npmjs.com/package/nock#axios">not working with axios out of the box</a>.</p>
<h1>
  <code>msw</code>
</h1>
<p>I later also tried <code>msw</code> after reading
<a href="https://kentcdodds.com/blog/stop-mocking-fetch/">Stop mocking fetch</a> by Kent C.
Odds, and I liked it at lot. It can work in a browser (as a service worker) or
node.js (by intercepting requests made by native modules).</p>
<p>The problems I had with it is that it does not recognize URL search/query params
in the URL,
<a href="https://github.com/mswjs/msw/issues/71">you have to parse it yourself in the response handler</a>.
This is by design though, it&rsquo;s just something I disliked.</p>
<p>Also, all mocks are usually in a separate file, like in <code>./mocks/handlers.js</code>,
which I thought made tests harder to read. It doesn&rsquo;t have to be like that of
course, but it&rsquo;s response handlers can get pretty long so it&rsquo;s a sane option.</p>
<h1>
  <code>cypress</code>
</h1>
<p>All of these led me to try <a href="https://docs.cypress.io/"><code>Cypress</code></a>, and I&rsquo;m
inclined to say it is my favorite solution so far.</p>
<p>You don&rsquo;t have to explicitly wait for anything to appear or disappear because it
does so automatically by
<a href="https://docs.cypress.io/guides/core-concepts/retry-ability">retrying it multiple times until a timeout is reached</a>
and it has a built-in API for mocking network requests with the
<a href="https://docs.cypress.io/api/commands/intercept">intercept function</a>.</p>
<p>But it&rsquo;s not perfect either:</p>
<ul>
<li>It has its own quirks like using the <code>window</code> object might not work as you
expect because
<a href="https://docs.cypress.io/api/commands/window#Cypress-uses-2-different-windows">Cypress uses two different windows</a>.</li>
<li>The <code>intercept</code> API has some unexpected behaviors like
<a href="https://github.com/cypress-io/cypress/issues/15956">requiring URLs to be properly encoded</a>,
and others only recently fixed like its
<a href="https://github.com/cypress-io/cypress/issues/9302">most recent calls not overriding earlier ones</a>.</li>
</ul>
<p>The benefits far outweigh these problems, mainly around debuggability:</p>
<ul>
<li>Each step (assertion, interceptions) is traced and shown by the test runner.</li>
<li>You have access to browser debugging capabilities, so you have access to the
browser DevTools.</li>
<li>There are snapshots of the UI state for each step.</li>
<li>Screenshots and videos of the test runs are recorded by default.</li>
</ul>
<h1>
  Conclusion
</h1>
<p>I think everyone would agree that Cypress is much well-suited for integration
tests. I thought <code>react-testing-library</code> to be complicated for complex
functional tests, so I&rsquo;d prefer to use it for unit testing small component
logic.</p>

