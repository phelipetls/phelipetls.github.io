import{S as e,d as t}from"./index.8cd12ada.js";import{j as a}from"./jsx-runtime.7a8c40fc.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./types-965d4afd.f5669dee.js";import"./Tab.e3ea653a.js";import"./createReactComponent.099c7328.js";import"./CopyCodeBlockButton.3f07436d.js";import"./index.ffa87b56.js";import"./floating-ui.dom.esm.b18ad48e.js";function c(){return a.jsx(e,{template:"vanilla",title:"The same bug observed when using details element can be reproduced with vanilla JavaScript",files:{"/src/index.js":t`
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
        `}})}export{c as default};