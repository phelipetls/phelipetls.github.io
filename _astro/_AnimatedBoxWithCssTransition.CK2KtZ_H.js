import{j as t}from"./tw-merge.D6bB7Zk8.js";import{S as o}from"./Sandpack.BNgqq2D6.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function m(){return t.jsx(o,{template:"static",title:"Animating a box moving forward (with CSS transitions)",files:{"/index.html":`<!DOCTYPE html>
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
