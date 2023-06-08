import{S as t}from"./Sandpack.ff5aabae.js";import{d as e}from"./index.8aa7c818.js";import{j as p}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.92c2aa37.js";import"./index.772d13e4.js";import"./createLucideIcon.0eda30d5.js";import"./floating-ui.dom.browser.min.b9202534.js";function d(){return p.jsx(t,{template:"react",title:"Bug when using details element with React",files:{"App.js":e`
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
        `}})}export{d as default};
