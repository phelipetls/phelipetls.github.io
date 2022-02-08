# [adb: a must-know CLI tool for Android development](https://phelipetls.github.io/posts/adb-a-must-know-cli-tool-for-android-development/)

February 07, 2022 · 4 min. read time

---

<p><a href="https://developer.android.com/studio/command-line/adb"><code>adb</code></a> is a CLI that
lets you control your Android device from your computer. In this post I want to
share its features that made me enjoy more mobile development.</p>
<!-- more -->
<h1>
  Initial Setup
</h1>
<p>First, you&rsquo;ll need to connect your device to your computer, either <a href="https://developer.android.com/studio/command-line/adb#Enabling">through
USB</a> or <a href="https://developer.android.com/studio/command-line/adb#connect-to-a-device-over-wi-fi-android-11+">purely
via
Wi-Fi</a>
(<em>if you&rsquo;re on Android 11+</em>), but it&rsquo;s also possible to use <code>adb</code> over Wi-Fi on
Android 10 or lower if you follow some <a href="https://developer.android.com/studio/command-line/adb#wireless">initial
steps</a> while
connected over USB.</p>
<p>If everything works correctly, by running <code>adb devices</code> you should see
something like this:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">$ adb devices

List of devices attached
emulator-5554	device
0035714150	device
</code></pre></div><h1>
  Record screen with <code>adb shell screenrecord</code>
</h1>
<p>It&rsquo;s as simple as running <code>adb shell screenrecord /sdcard/video.mp4</code> to start
recording and then <kbd>Ctrl</kbd> + <kbd>C</kbd> when you&rsquo;re done. And then
<code>adb pull /sdcard/video.mp4 ~/Videos/video.mp4</code> to get it into your computer.</p>
<p>This is invaluable to me. I&rsquo;m now able to more easily record how a feature
works or to demonstrate a bug.</p>
<p>It&rsquo;s also useful to know some of the <a href="https://developer.android.com/studio/command-line/adb#screenrecord">command line
options</a>,
my favorite ones being to limit the video size <code>--size</code> and limit recording
time <code>--time-limit</code>.</p>
<p>I usually run <code>adb shell screenrecord --size 320x568 --time-limit=120 /sdcard/video.mp4</code>, to keep the video small.</p>
<h1>
  Capture screen with <code>adb shell screencap</code>
</h1>
<p>This is straightforward, just capture the screen with <code>adb shell screencap /sdcard/img.png</code>, then getit locally with <code>adb pull /sdcard/img.png ~/Images/img.png</code>.</p>
<h1>
  Debugging with <code>adb logcat</code>
</h1>
<p>This has proved useful to me so many times. In the context of React Native
development, this is usually less useful during development on debug builds.
But in release builds it&rsquo;s the only way to debug when something wrong happens.</p>
<p>For example, when an app crashes or some SDK call is not working, you&rsquo;ll
probably be able to see why with <code>adb logcat</code>.</p>
<p>The downside is that the output can be overwhelming, since it&rsquo;s usually a wall
of text that is growing constantly. So it&rsquo;s useful to know how you can filter
this
output.</p>
<p>For example, if I wanted to see only logs tagged with <code>Sentry</code>, <code>ReactNative</code>
and <code>ReactNativeJS</code> at any priority:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">adb logcat Sentry:* ReactNative:* ReactNativeJS:* *:S
</code></pre></div><p>The official Google
<a href="https://developer.android.com/studio/command-line/logcat#filteringOutput">documentation</a>
explains nicely how this works.</p>
<h1>
  Networking with <code>adb reverse</code>
</h1>
<p>This one is best explained through an example.</p>
<p>Image you want to see your <a href="https://storybook.js.org/">Storybook</a> files in a
mobile web browser. In your computer&rsquo;s browser, it works if you go to
<code>localhost:6006</code> but not in your mobile device&rsquo;s browser.</p>
<p>Well, you can solve this with <code>adb reverse tcp:6006 tcp:6006</code>.</p>
<p>This is useful for any web server running in your local computer, e.g., a web
API server or a webpack development server.</p>
<p>In the React Native world, we sometimes need to run <code>adb reverse tcp:8081 tcp:8081</code> it the device is stuck at loading the JS bundle or can&rsquo;t find it at
all. If you run this once without knowing what it does, now you know. It&rsquo;s
routing a your mobile device&rsquo;s request to <code>localhost:8081</code> to your computer&rsquo;s
<code>localhost</code>.</p>
<p>There&rsquo;s also <code>adb forward</code>, which is the opposite of <code>adb reverse</code>, so it&rsquo;s
hardly as useful.</p>
<h1>
  Start/kill app
</h1>
<p>You can start and kill an app with the <code>adb shell am</code>, in which <code>am</code> stands for
<a href="https://developer.android.com/studio/command-line/adb#am"><em>Activity Manager</em></a>.</p>
<p>Given the app&rsquo;s package name, you can start it with:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">adb shell am start -n com.company.app/.MainActivity
</code></pre></div><p>And kill it with:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">adb shell am force-stop com.company.app
</code></pre></div><p>You can also open a URL, this is specially useful to test deep links:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">adb shell am start -a android.intent.action.VIEW -d company://Screen
</code></pre></div><h1>
  Install and uninstall apps
</h1>
<p>You can install an <code>.apk</code> file with <code>adb install app.apk</code>.</p>
<p>And uninstall it with <code>adb uninstall com.company.app</code>.</p>
<p>This is usually how I do it, but there&rsquo;s also the <code>pm</code> command, which stands
for <a href="https://developer.android.com/studio/command-line/adb#pm">Package
Manager</a>, that is a
more powerful interface to manage apps. Apart from enabling you to install and
uninstall apps, you can also clear data, grant/revoke permissions etc.</p>

