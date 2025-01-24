import{j as e}from"./tw-merge.BX59QNfr.js";import{S as t}from"./Sandpack.D8BFDkvd.js";import"./index.v9NO2EbV.js";import"./Tab.C2zSSDam.js";import"./CopyCodeBlockButton.CXK7bwpi.js";import"./createLucideIcon.Cfxfx4lJ.js";function o(){return e.jsx(t,{title:"An example implementing a infinite list of numbers with useInView",template:"react",customSetup:{dependencies:{"react-intersection-observer":"9.5.2"}},files:{"/App.js":`import { useState } from 'react'
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
