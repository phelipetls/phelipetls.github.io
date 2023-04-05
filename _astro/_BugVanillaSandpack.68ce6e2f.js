import{S as e,d as t}from"./index.9b1fa820.js";import{j as a}from"./jsx-runtime.7a8c40fc.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.e3ea653a.js";import"./createReactComponent.099c7328.js";import"./CopyCodeBlockButton.ce6a0b11.js";import"./index.ffa87b56.js";import"./floating-ui.dom.browser.min.8b9d8992.js";function d(){return a.jsx(e,{template:"vanilla",title:"The same bug observed when using details element can be reproduced with vanilla JavaScript",files:{"/src/index.js":t`
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
        `}})}export{d as default};
