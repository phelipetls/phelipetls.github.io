import{S as o}from"./Sandpack.85ba7565.js";import{j as i}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.7cde34a4.js";import"./createLucideIcon.39155ea3.js";function l(t){return i.jsx(o,{...t,template:"static",title:"Animating a box moving forward (with requestAnimationFrame)",files:{"/index.html":`<!DOCTYPE html>
<html>
  <style>
    .box {
      background-color: black;
      width: 20px;
      aspect-ratio: 1 / 1;
    }
  </style>

  <body>
    <div class="box"></div>
  </body>

  <script>
    const ANIMATION_DURATION = 1000
    const PIXELS_TO_MOVE = 100

    const box = document.querySelector('.box')

    let start
    let position = 0

    function animateBox(timestamp) {
      console.log('animating box')

      if (start === undefined) {
        start = timestamp
      }

      const elapsed = timestamp - start
      const timeProgress = elapsed / ANIMATION_DURATION

      position = Math.min(PIXELS_TO_MOVE, PIXELS_TO_MOVE * timeProgress)

      box.style.transform = \`translateX(\${position}px)\`

      if (position < PIXELS_TO_MOVE) {
        requestAnimationFrame(animateBox)
      }
    }

    requestAnimationFrame(animateBox)
  <\/script>
</html>`}})}export{l as default};
