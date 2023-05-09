import{S as t}from"./Sandpack.054b0c60.js";import{d as e}from"./index.8aa7c818.js";import{j as s}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.f99687ad.js";import"./index.772d13e4.js";import"./createLucideIcon.e05d58c0.js";import"./floating-ui.dom.browser.min.b9202534.js";function f(){return s.jsx(t,{template:"react",title:"Fixed bug when using details element with React, using toggle event",files:{"App.js":e`
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
