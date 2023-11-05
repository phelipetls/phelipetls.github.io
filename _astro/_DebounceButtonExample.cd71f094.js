import{j as e}from"./tw-merge.d8067f3d.js";import{S as o}from"./Sandpack.35dbff64.js";import"./index.a2a0beca.js";import"./_commonjsHelpers.de833af9.js";import"./Tab.7a91ada5.js";import"./CopyCodeBlockButton.c533e2fc.js";import"./createLucideIcon.85dada26.js";function m(t){return e.jsx(o,{...t,title:"A button with a debounced onClick event handler",template:"vanilla",files:{"/index.js":`import { debounce } from './debounce.js'

const button = document.createElement('button')
button.textContent = 'Click me'
button.addEventListener('click', debounce(() => {
  console.log('I ran')
}, 300))

app.appendChild(button)
`,"/debounce.js":t.debounceCode}})}export{m as default};
