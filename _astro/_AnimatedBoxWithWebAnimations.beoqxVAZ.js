import{j as t}from"./tw-merge.BX59QNfr.js";import{S as o}from"./Sandpack.D8BFDkvd.js";import"./index.v9NO2EbV.js";import"./Tab.C2zSSDam.js";import"./CopyCodeBlockButton.CXK7bwpi.js";import"./createLucideIcon.Cfxfx4lJ.js";function s(){return t.jsx(o,{template:"static",title:"Animating a box moving forward (with Web Animations API)",files:{"/index.html":`<!DOCTYPE html>
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
