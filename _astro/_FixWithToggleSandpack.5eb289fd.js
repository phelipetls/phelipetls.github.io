import{S as t,d as e}from"./index.43186375.js";import{j as s}from"./jsx-runtime.7a8c40fc.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./types-965d4afd.f5669dee.js";import"./Tab.e3ea653a.js";import"./createReactComponent.099c7328.js";import"./CopyCodeBlockButton.5df0af12.js";import"./index.ffa87b56.js";import"./floating-ui.dom.esm.5aa821b1.js";function f(){return s.jsx(t,{template:"react",title:"Fixed bug when using details element with React, using toggle event",files:{"App.js":e`
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
              </>
            )
          }
        `}})}export{f as default};
