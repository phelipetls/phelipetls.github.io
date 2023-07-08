import{S as t}from"./Sandpack.86a41622.js";import{d as e}from"./index.8aa7c818.js";import{j as s}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.8fe08775.js";import"./createLucideIcon.dae7146d.js";function l(){return s.jsx(t,{template:"react",title:"Bug when using details element with React",files:{"App.js":e`
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
