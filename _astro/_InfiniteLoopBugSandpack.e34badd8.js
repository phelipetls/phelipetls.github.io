import{j as t}from"./tw-merge.dd1f01ef.js";import{S as e}from"./Sandpack.80a4de6c.js";import{d as s}from"./index.8aa7c818.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.cb5c320d.js";import"./createLucideIcon.cbcd067e.js";function l(){return t.jsx(e,{template:"react",title:"Infinite loop when using details toggle event",files:{"App.js":s`
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
        `}})}export{l as default};
