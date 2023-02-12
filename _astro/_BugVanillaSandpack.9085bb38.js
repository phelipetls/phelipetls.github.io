import{S as e,d as t}from"./index.610ad28f.js";import{j as a}from"./jsx-runtime.c931ae04.js";import"./index.385e17fc.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.2ec63c9a.js";import"./createReactComponent.b6a655c0.js";import"./CopyCodeBlockButton.2439efb8.js";import"./index.3b45fd04.js";function u(){return a.jsx(e,{template:"vanilla",title:"The same bug observed when using details element can be reproduced with vanilla JavaScript",files:{"/src/index.js":t`
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
