import{S as e}from"./Sandpack.5cd6e811.js";import{d as t}from"./index.8aa7c818.js";import{j as s}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.7cde34a4.js";import"./createLucideIcon.39155ea3.js";function l(){return s.jsx(e,{template:"react",title:"Fixed bug when using details element with React, using preventDefault",files:{"App.js":t`
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
        `}})}export{l as default};
