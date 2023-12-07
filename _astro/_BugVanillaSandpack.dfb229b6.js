import{j as e}from"./tw-merge.dd1f01ef.js";import{S as t}from"./Sandpack.fc9f7533.js";import{d as a}from"./index.8aa7c818.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.4305fca2.js";import"./IconButton.21971510.js";function p(){return e.jsx(t,{template:"vanilla",title:"The same bug observed when using details element can be reproduced with vanilla JavaScript",files:{"index.js":a`
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
        `}})}export{p as default};
