import{S as t,d as e}from"./index.bd5f8439.js";import{j as s}from"./jsx-runtime.0673f7bd.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.a2d5a363.js";import"./createLucideIcon.e879622d.js";import"./CopyCodeBlockButton.226c9228.js";import"./index.ffa87b56.js";import"./floating-ui.dom.browser.min.0e955118.js";function c(){return s.jsx(t,{template:"react",title:"Bug when using details element with React",files:{"App.js":e`
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
        `}})}export{c as default};
