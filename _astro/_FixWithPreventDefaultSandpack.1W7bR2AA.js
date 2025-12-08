import{j as e}from"./tw-merge.D6bB7Zk8.js";import{S as t}from"./Sandpack.DPrMf9JO.js";import{d as s}from"./index.BxBVU389.js";import"./index.B1tThdBL.js";import"./Tabs.DwYH9wi3.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function u(){return e.jsx(t,{template:"react",title:"Fixed bug when using details element with React, using preventDefault",files:{"App.js":s`
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
