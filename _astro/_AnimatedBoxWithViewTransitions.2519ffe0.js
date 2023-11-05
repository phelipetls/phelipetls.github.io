import{j as t}from"./tw-merge.d8067f3d.js";import{S as i}from"./Sandpack.35dbff64.js";import"./index.a2a0beca.js";import"./_commonjsHelpers.de833af9.js";import"./Tab.7a91ada5.js";import"./CopyCodeBlockButton.c533e2fc.js";import"./createLucideIcon.85dada26.js";function d(){return t.jsx(i,{template:"static",title:"Animating a box moving forward (with View transitions)",files:{"/index.html":`<!DOCTYPE html>
<html>
  <style>
    .box {
      background-color: black;
      width: 20px;
      aspect-ratio: 1 / 1;
      transition: transform 1s linear;
      view-transition-name: box;
    }

    .animated-box {
      transform: translateX(100px);
    }
  </style>

  <body>
    <div class="box"></div>
  </body>

  <script>
    if (!document.startViewTransition) {
      document.body.innerHTML = 'Your browser does not suppport View Transitions API yet.'
    }

    const box = document.querySelector('.box')
    document.startViewTransition(() => {
      box.classList.add('animated-box')
    })
  <\/script>
</html>`}})}export{d as default};
