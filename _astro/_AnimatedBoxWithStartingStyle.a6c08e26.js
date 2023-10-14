import{j as t}from"./tw-merge.d8067f3d.js";import{S as r}from"./Sandpack.3e2859d2.js";import"./index.a2a0beca.js";import"./_commonjsHelpers.de833af9.js";import"./Tab.ef250944.js";import"./CopyCodeBlockButton.c533e2fc.js";import"./createLucideIcon.85dada26.js";function p(){return t.jsx(r,{template:"static",title:"Animating a box moving forward (with CSS transitions and @starting-style)",files:{"/index.html":{active:!0,code:`<!DOCTYPE html>
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

  <script>
    if (!CSS.supports('@starting-style')) {
      document.body.innerHTML = 'Your browser does not suppport @starting-style yet.'
    }
  <\/script>
<html>`}}})}export{p as default};
