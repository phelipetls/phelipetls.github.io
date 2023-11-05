import{j as e}from"./tw-merge.d8067f3d.js";import{S as t}from"./Sandpack.48ee3edd.js";import{d as s}from"./index.8aa7c818.js";import"./index.a2a0beca.js";import"./_commonjsHelpers.de833af9.js";import"./Tab.7a91ada5.js";import"./CopyCodeBlockButton.c533e2fc.js";import"./createLucideIcon.85dada26.js";function l(){return e.jsx(t,{template:"react",title:"Fixed bug when using details element with React, using toggle event",files:{"App.js":s`
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
        `}})}export{l as default};
