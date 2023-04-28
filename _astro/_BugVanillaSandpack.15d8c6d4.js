import{S as e}from"./Sandpack.ddf6e799.js";import{d as t}from"./index.8aa7c818.js";import{j as a}from"./jsx-runtime.0673f7bd.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.a9c2365b.js";import"./CopyCodeBlockButton.55bfe2f1.js";import"./index.ffa87b56.js";import"./createLucideIcon.59f306f6.js";import"./floating-ui.dom.browser.min.0e955118.js";function c(){return a.jsx(e,{template:"vanilla",title:"The same bug observed when using details element can be reproduced with vanilla JavaScript",files:{"index.js":t`
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
