import{j as t}from"./tw-merge.D6bB7Zk8.js";import{S as o}from"./Sandpack.BNgqq2D6.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function s(){return t.jsx(o,{template:"static",title:"Animating a box moving forward (with Web Animations API)",files:{"/index.html":`<!DOCTYPE html>
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
    const box = document.querySelector('.box')

    box.animate([
      {
        transform: 'translateX(100px)',
      }
    ], {
      fill: 'forwards',
      duration: 1000,
    })
  <\/script>
</html>`}})}export{s as default};
