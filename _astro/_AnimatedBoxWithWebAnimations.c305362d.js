import{j as t}from"./tw-merge.dd1f01ef.js";import{S as o}from"./Sandpack.5a922142.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.08bbc0f2.js";import"./IconButton.9e457559.js";function s(){return t.jsx(o,{template:"static",title:"Animating a box moving forward (with Web Animations API)",files:{"/index.html":`<!DOCTYPE html>
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
