import{j as t}from"./tw-merge.D6bB7Zk8.js";import{S as a}from"./Sandpack.DPrMf9JO.js";import"./index.B1tThdBL.js";import"./Tabs.DwYH9wi3.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function m(){return t.jsx(a,{template:"static",title:"Animating a box moving forward (with CSS transitions and @starting-style)",files:{"/index.html":{active:!0,code:`<!DOCTYPE html>
<html>
  <style>
    .box {
      background-color: black;
      width: 20px;
      aspect-ratio: 1 / 1;
      transition: transform 1s linear;
      transform: translateX(100px);
    }

    @starting-style {
      .box {
        transform: translateX(0px);
      }
    }
  </style>

  <body>
    <div class="box"></div>
  </body>
<html>`}}})}export{m as default};
