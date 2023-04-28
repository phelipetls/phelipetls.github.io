import{S as t}from"./Sandpack.11d3eb3b.js";import{d as e}from"./index.8aa7c818.js";import{j as o}from"./jsx-runtime.0673f7bd.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.a9c2365b.js";import"./CopyCodeBlockButton.55bfe2f1.js";import"./index.ffa87b56.js";import"./createLucideIcon.59f306f6.js";import"./floating-ui.dom.browser.min.0e955118.js";function d(){return o.jsx(t,{template:"react",title:"Infinite loop when using details toggle event",files:{"App.js":e`
          import { useState } from 'react'

          export default function App() {
            const [isOpen, setIsOpen] = useState(false)

            return (
              <>
                <span>State: {isOpen ? 'open' : 'closed'}</span>

                <details
                  open={isOpen}
                  onToggle={() => {
                    setIsOpen(!isOpen)
                  }}
                >
                  <summary>Summary</summary>
                  Details
                </details>

                <button onClick={() => setIsOpen(!isOpen)}>Toggle details</button>
              </>
            )
          }
        `}})}export{d as default};
