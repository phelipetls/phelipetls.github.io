import{S as e,d as t}from"./chunks/index.c4b03f3b.js";import{j as s}from"./chunks/tw-merge.ef383cd6.js";import"./chunks/index.8dbfd31f.js";import"./chunks/_commonjsHelpers.37791fd4.js";import"./chunks/Tab.2d86fb89.js";import"./chunks/createReactComponent.ecaff21f.js";function m(){return s.exports.jsx(e,{template:"react",title:"Bug when using details element with React",files:{"App.js":t`
          import { useState } from 'react'

          export default function App() {
            const [isOpen, setIsOpen] = useState(false)

            return (
              <>
                <span>State: {isOpen ? 'open' : 'closed'}</span>

                <details open={isOpen}>
                  <summary
                    onClick={() => {
                      setIsOpen(!isOpen)
                    }}
                  >
                    Summary
                  </summary>
                  Details
                </details>
              </>
            )
          }
        `}})}export{m as default};
