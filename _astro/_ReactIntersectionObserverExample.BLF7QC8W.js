import{j as e}from"./tw-merge.BX59QNfr.js";import{S as t}from"./Sandpack.D8BFDkvd.js";import"./index.v9NO2EbV.js";import"./Tab.C2zSSDam.js";import"./CopyCodeBlockButton.CXK7bwpi.js";import"./createLucideIcon.Cfxfx4lJ.js";function c(){return e.jsx(t,{title:"An example showing how intersection observer can be used in React",template:"react",files:{"/App.js":`import { useState, useRef, useEffect } from 'react'

export default function App() {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const target = useRef(null)

  useEffect(() => {
    if (!target.current) {
      return
    }

    const observer = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting)
    )

    observer.observe(target.current)

    return () => {
      observer.unobserve(target.current)
    }
  }, [target])

  return (
    <div
      ref={target}
      style={{
        display: 'grid',
        placeItems: 'center',
        backgroundColor: isIntersecting ? 'green' : 'red',
        transition: 'background-color 500ms ease-in-out',
        height: 100,
      }}
    >
      I'm being observed
    </div>
  )
}
`}})}export{c as default};
