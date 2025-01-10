import{j as e}from"./tw-merge.BweXSh_q.js";import{S as t}from"./Sandpack.BityU5sF.js";import"./index.BYb6XiQz.js";import"./Tab.CyndRYmn.js";import"./CopyCodeBlockButton.D5a17zwY.js";import"./createLucideIcon.BjvSJhcM.js";function c(){return e.jsx(t,{title:"An example showing how intersection observer can be used in React",template:"react",files:{"/App.js":`import { useState, useRef, useEffect } from 'react'

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
