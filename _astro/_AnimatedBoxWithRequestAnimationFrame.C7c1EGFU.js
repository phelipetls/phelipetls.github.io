import{j as o}from"./tw-merge.BX59QNfr.js";import{S as i}from"./Sandpack.D8BFDkvd.js";import"./index.v9NO2EbV.js";import"./Tab.C2zSSDam.js";import"./CopyCodeBlockButton.CXK7bwpi.js";import"./createLucideIcon.Cfxfx4lJ.js";function p(t){return o.jsx(i,{...t,template:"static",title:"Animating a box moving forward (with requestAnimationFrame)",files:{"/index.html":`<!DOCTYPE html>
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
</html>`}})}export{p as default};
