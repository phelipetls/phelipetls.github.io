import{S as t}from"./Sandpack.2848b8bf.js";import{d as e}from"./index.8aa7c818.js";import{j as o}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.83b14759.js";import"./index.772d13e4.js";import"./createLucideIcon.dae7146d.js";import"./floating-ui.dom.browser.min.b9202534.js";function d(){return o.jsx(t,{template:"react",title:"Infinite loop when using details toggle event",files:{"App.js":e`
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
