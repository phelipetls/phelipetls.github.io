import{j as t}from"./tw-merge.BX59QNfr.js";import{S as i}from"./Sandpack.D8BFDkvd.js";import"./index.v9NO2EbV.js";import"./Tab.C2zSSDam.js";import"./CopyCodeBlockButton.CXK7bwpi.js";import"./createLucideIcon.Cfxfx4lJ.js";function m(){return t.jsx(i,{template:"static",title:"Animating a box moving forward (with View transitions)",files:{"/index.html":`<!DOCTYPE html>
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
</html>`}})}export{m as default};
