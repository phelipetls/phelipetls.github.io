import{S as e,d as t}from"./index.440098a3.js";import{j as p}from"./jsx-runtime.7a8c40fc.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.e3ea653a.js";import"./createReactComponent.099c7328.js";import"./CopyCodeBlockButton.ce6a0b11.js";import"./index.ffa87b56.js";import"./floating-ui.dom.browser.min.8b9d8992.js";function f(){return p.jsx(e,{template:"react",title:"Fixed bug when using details element with React, using preventDefault",files:{"App.js":t`
          import { useState } from 'react'

          export default function App() {
            const [isOpen, setIsOpen] = useState(false)

            return (
              <>
                <span>State: {isOpen ? 'open' : 'closed'}</span>

                <details open={isOpen}>
                  <summary
                    onClick={(e) => {
                      e.preventDefault()
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
        `}})}export{f as default};
