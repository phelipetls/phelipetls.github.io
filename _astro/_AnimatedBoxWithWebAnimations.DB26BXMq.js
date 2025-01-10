import{j as t}from"./tw-merge.BweXSh_q.js";import{S as o}from"./Sandpack.BityU5sF.js";import"./index.BYb6XiQz.js";import"./Tab.CyndRYmn.js";import"./CopyCodeBlockButton.D5a17zwY.js";import"./createLucideIcon.BjvSJhcM.js";function s(){return t.jsx(o,{template:"static",title:"Animating a box moving forward (with Web Animations API)",files:{"/index.html":`<!DOCTYPE html>
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
