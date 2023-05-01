import{S as t}from"./Sandpack.4133e19b.js";import{d as e}from"./index.8aa7c818.js";import{j as s}from"./jsx-runtime.0673f7bd.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.a9c2365b.js";import"./CopyCodeBlockButton.ece7709e.js";import"./index.ffa87b56.js";import"./createLucideIcon.c5f18fbe.js";import"./floating-ui.dom.browser.min.0e955118.js";function f(){return s.jsx(t,{template:"react",title:"Fixed bug when using details element with React, using toggle event",files:{"App.js":e`
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
              </>
            )
          }
        `}})}export{f as default};
