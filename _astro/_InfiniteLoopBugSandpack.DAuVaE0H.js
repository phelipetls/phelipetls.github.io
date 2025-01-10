import{j as t}from"./tw-merge.BweXSh_q.js";import{S as e}from"./Sandpack.BityU5sF.js";import{d as s}from"./index.BxBVU389.js";import"./index.BYb6XiQz.js";import"./Tab.CyndRYmn.js";import"./CopyCodeBlockButton.D5a17zwY.js";import"./createLucideIcon.BjvSJhcM.js";function l(){return t.jsx(e,{template:"react",title:"Infinite loop when using details toggle event",files:{"App.js":s`
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
