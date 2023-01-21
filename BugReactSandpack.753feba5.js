import{S as t,d as e}from"./chunks/index.60fe852b.js";import{j as s}from"./chunks/tw-merge.ef383cd6.js";import"./chunks/index.8dbfd31f.js";import"./chunks/_commonjsHelpers.37791fd4.js";import"./chunks/Tab.2d86fb89.js";import"./chunks/createReactComponent.8a376ebc.js";import"./CopyCodeBlockButton.cbf359cc.js";import"./chunks/index.d39fc9d8.js";function l(){return s.exports.jsx(t,{template:"react",title:"Bug when using details element with React",files:{"App.js":e`
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
        `}})}export{l as default};
