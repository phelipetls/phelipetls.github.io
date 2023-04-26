import{S as t,d as e}from"./index.df1b42e1.js";import{j as s}from"./jsx-runtime.0673f7bd.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.a9c2365b.js";import"./CopyCodeBlockButton.b02e9558.js";import"./index.ffa87b56.js";import"./createLucideIcon.e5a06aca.js";import"./floating-ui.dom.browser.min.0e955118.js";function d(){return s.jsx(t,{template:"react",title:"Infinite loop when using details toggle event",files:{"App.js":e`
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
        `}})}export{d as default};
