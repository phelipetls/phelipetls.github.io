import{j as t}from"./tw-merge.dd1f01ef.js";import{S as o}from"./Sandpack.3493e1c6.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.1edd83cb.js";import"./createLucideIcon.82e5ca66.js";function m(){return t.jsx(o,{template:"static",title:"Animating a box moving forward (with CSS transitions)",files:{"/index.html":`<!DOCTYPE html>
<html>
  <style>
    .box {
      background-color: black;
      width: 20px;
      aspect-ratio: 1 / 1;
      transition: transform 1s linear;
    }

    .animated-box {
      transform: translateX(100px);
    }
  </style>

  <body>
    <div class="box"></div>
  </body>

  <script>
    // We need to force a reflow here for the animation to work
    document.body.getBoundingClientRect()
    document.querySelector('.box').classList.add('animated-box')
  <\/script>
</html>`}})}export{m as default};
