import{j as t}from"./tw-merge.BX59QNfr.js";import{S as a}from"./Sandpack.D8BFDkvd.js";import"./index.v9NO2EbV.js";import"./Tab.C2zSSDam.js";import"./CopyCodeBlockButton.CXK7bwpi.js";import"./createLucideIcon.Cfxfx4lJ.js";function m(){return t.jsx(a,{template:"static",title:"Animating a box moving forward (with CSS transitions and @starting-style)",files:{"/index.html":{active:!0,code:`<!DOCTYPE html>
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
