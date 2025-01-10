import{j as e}from"./tw-merge.BweXSh_q.js";import{S as t}from"./Sandpack.BityU5sF.js";import"./index.BYb6XiQz.js";import"./Tab.CyndRYmn.js";import"./CopyCodeBlockButton.D5a17zwY.js";import"./createLucideIcon.BjvSJhcM.js";function o(){return e.jsx(t,{title:"An example implementing an infinite list of numbers with useInView (with callback refs)",template:"react",customSetup:{dependencies:{"react-intersection-observer":"9.5.2"}},files:{"/App.js":`import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getRange } from './getRange.js'

export default function App() {
  const [lastNumber, setLastNumber] = useState(10)

  const numbers = getRange(0, lastNumber)

  const { ref: target, inView } = useInView({
    onChange: (inView) => {
      if (inView) {
        setLastNumber(lastNumber + 10)
      }
    },
  })

  return (
    <>
      {numbers.map((number, index) => (
        <div
          ref={(node) => {
            if (index === numbers.length - 1) {
              target(node)
            }
          }}
        >
          {number}
        </div>
      ))}
    </>
  )
}
`,"/getRange.js":`export function getRange(initialNumber: number, lastNumber: number) {
  const length = lastNumber - initialNumber

  return Array.from({ length }).map((_, index) => index + initialNumber)
}
`}})}export{o as default};
