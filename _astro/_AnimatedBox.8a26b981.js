import{j as o}from"./tw-merge.dd1f01ef.js";import{S as i}from"./Sandpack.3493e1c6.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.1edd83cb.js";import"./createLucideIcon.82e5ca66.js";function x({withForwards:t=!0,...a}){return o.jsx(i,{template:"static",...a,title:"Animating a box moving forward",files:{"/index.html":`<!DOCTYPE html>
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
</html>`}})}export{x as default};
