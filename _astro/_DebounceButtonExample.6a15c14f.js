import{j as t}from"./tw-merge.dd1f01ef.js";import{S as n}from"./Sandpack.3493e1c6.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.1edd83cb.js";import"./createLucideIcon.82e5ca66.js";function r(e){return t.jsx(n,{...e,title:"A button with a debounced onClick event handler",template:"vanilla",files:{"/index.js":`import { debounce } from './debounce.js'

const button = document.createElement('button')
button.textContent = 'Click me'
button.addEventListener('click', debounce(() => {
  console.log('I ran')
}, 300))

app.appendChild(button)
`,"/debounce.js":e.debounceCode}})}export{r as default};
