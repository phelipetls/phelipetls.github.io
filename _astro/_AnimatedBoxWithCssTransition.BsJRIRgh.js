import{j as t}from"./tw-merge.BweXSh_q.js";import{S as o}from"./Sandpack.BityU5sF.js";import"./index.BYb6XiQz.js";import"./Tab.CyndRYmn.js";import"./CopyCodeBlockButton.D5a17zwY.js";import"./createLucideIcon.BjvSJhcM.js";function m(){return t.jsx(o,{template:"static",title:"Animating a box moving forward (with CSS transitions)",files:{"/index.html":`<!DOCTYPE html>
<html>
  <style>
    .box {
      background-color: black;
      width: 20px;
      aspect-ratio: 1 / 1;
      transition: transform 1s linear;
    }

    .animated-box {
      transform: translateX(100px);
    }
  </style>

  <body>
    <div class="box"></div>
  </body>

  <script>
    // We need to force a reflow here for the animation to work
    document.body.getBoundingClientRect()
    document.querySelector('.box').classList.add('animated-box')
  <\/script>
</html>`}})}export{m as default};
