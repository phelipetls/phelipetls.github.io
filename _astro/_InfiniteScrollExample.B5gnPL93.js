import{j as e}from"./tw-merge.D6bB7Zk8.js";import{S as t}from"./Sandpack.BNgqq2D6.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function o(){return e.jsx(t,{title:"An example implementing a infinite list of numbers with useInView",template:"react",customSetup:{dependencies:{"react-intersection-observer":"9.5.2"}},files:{"/App.js":`import { useState } from 'react'
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
      {numbers.map((number) => (
        <div>{number}</div>
      ))}

      <div ref={target}>Loading...</div>
    </>
  )
}
`,"/getRange.js":`export function getRange(initialNumber: number, lastNumber: number) {
  const length = lastNumber - initialNumber

  return Array.from({ length }).map((_, index) => index + initialNumber)
}
`}})}export{o as default};
