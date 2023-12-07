import{j as t}from"./tw-merge.dd1f01ef.js";import{S as a}from"./Sandpack.fc9f7533.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.4305fca2.js";import"./IconButton.21971510.js";function m(){return t.jsx(a,{template:"static",title:"Animating a box moving forward (with CSS transitions and @starting-style)",files:{"/index.html":{active:!0,code:`<!DOCTYPE html>
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
