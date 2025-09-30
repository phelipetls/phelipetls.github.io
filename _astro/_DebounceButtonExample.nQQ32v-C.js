import{j as t}from"./tw-merge.D6bB7Zk8.js";import{S as n}from"./Sandpack.BNgqq2D6.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function r(e){return t.jsx(n,{...e,title:"A button with a debounced onClick event handler",template:"vanilla",files:{"/index.js":`import { debounce } from './debounce.js'

const button = document.createElement('button')
button.textContent = 'Click me'
button.addEventListener('click', debounce(() => {
  console.log('I ran')
}, 300))

app.appendChild(button)
`,"/debounce.js":e.debounceCode}})}export{r as default};
