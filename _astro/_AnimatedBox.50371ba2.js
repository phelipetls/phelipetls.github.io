import{j as a}from"./tw-merge.d8067f3d.js";import{S as i}from"./Sandpack.9ba44f2b.js";import"./index.a2a0beca.js";import"./_commonjsHelpers.de833af9.js";import"./Tab.7a91ada5.js";import"./CopyCodeBlockButton.c533e2fc.js";import"./createLucideIcon.85dada26.js";function d({withForwards:t=!0,...o}){return a.jsx(i,{template:"static",...o,title:"Animating a box moving forward",files:{"/index.html":`<!DOCTYPE html>
<html>
  <style>
    .box {
      background-color: black;
      width: 20px;
      aspect-ratio: 1 / 1;
    }

    @keyframes box-animation {
      to {
        transform: translateX(100px);
      }
    }

    .animated-box {
      animation: box-animation 1s linear${t?" forwards":""};
    }
  </style>

  <body>
    <div class="box animated-box"></div>
  </body>
</html>`}})}export{d as default};
