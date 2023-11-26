import{j as e}from"./tw-merge.dd1f01ef.js";import{S as t}from"./Sandpack.3493e1c6.js";import{d as s}from"./index.8aa7c818.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.1edd83cb.js";import"./createLucideIcon.82e5ca66.js";function u(){return e.jsx(t,{template:"react",title:"Fixed bug when using details element with React, using preventDefault",files:{"App.js":s`
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
        `}})}export{u as default};
