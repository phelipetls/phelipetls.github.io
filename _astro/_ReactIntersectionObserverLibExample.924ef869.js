import{j as e}from"./tw-merge.dd1f01ef.js";import{S as t}from"./Sandpack.3493e1c6.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.1edd83cb.js";import"./createLucideIcon.82e5ca66.js";function p(){return e.jsx(t,{title:"An example showing how intersection observer can be used in React",template:"react",customSetup:{dependencies:{"react-intersection-observer":"9.5.2"}},files:{"/App.js":`import { useInView } from 'react-intersection-observer'

export default function App() {
  const { ref: target, inView } = useInView()

  return (
    <div
      ref={target}
      style={{
        display: 'grid',
        placeItems: 'center',
        backgroundColor: inView ? 'green' : 'red',
        transition: 'background-color 500ms ease-in-out',
        height: 100,
      }}
    >
      I'm being observed
    </div>
  )
}
`}})}export{p as default};
