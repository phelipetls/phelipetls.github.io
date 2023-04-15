import{S as t,d as e}from"./index.cbf96dd2.js";import{j as s}from"./jsx-runtime.7a8c40fc.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.e3ea653a.js";import"./createReactComponent.2e000565.js";import"./CopyCodeBlockButton.b847a920.js";import"./index.ffa87b56.js";import"./floating-ui.dom.browser.min.8b9d8992.js";function d(){return s.jsx(t,{template:"react",title:"Fixed bug when using details element with React, using toggle event",files:{"App.js":e`
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
        `}})}export{d as default};
