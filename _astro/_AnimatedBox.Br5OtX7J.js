import{j as o}from"./tw-merge.D6bB7Zk8.js";import{S as i}from"./Sandpack.DPrMf9JO.js";import"./index.B1tThdBL.js";import"./Tabs.DwYH9wi3.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function x({withForwards:t=!0,...a}){return o.jsx(i,{template:"static",...a,title:"Animating a box moving forward",files:{"/index.html":`<!DOCTYPE html>
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
