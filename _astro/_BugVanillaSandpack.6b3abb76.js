import{S as e}from"./Sandpack.86a41622.js";import{d as t}from"./index.8aa7c818.js";import{j as a}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.8fe08775.js";import"./createLucideIcon.dae7146d.js";function u(){return a.jsx(e,{template:"vanilla",title:"The same bug observed when using details element can be reproduced with vanilla JavaScript",files:{"index.js":t`
           document.getElementById('app').innerHTML = \`
           <span>State: closed</span>

           <details>
             <summary>Summary</summary>
             Details
           </details>
           \`

           const span = document.querySelector('span')
           const details = document.querySelector('details')
           const summary = document.querySelector('summary')

           let isOpen = false

           summary.addEventListener('click', () => {
             if (isOpen) {
               isOpen = false
               span.textContent = 'State: closed'
               details.removeAttribute('open')
               return
             }

             isOpen = true
             span.textContent = 'State: open'
             details.setAttribute('open', '')
           })
        `}})}export{u as default};
