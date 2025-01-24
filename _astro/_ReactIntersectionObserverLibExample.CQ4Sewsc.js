import{j as e}from"./tw-merge.BX59QNfr.js";import{S as t}from"./Sandpack.D8BFDkvd.js";import"./index.v9NO2EbV.js";import"./Tab.C2zSSDam.js";import"./CopyCodeBlockButton.CXK7bwpi.js";import"./createLucideIcon.Cfxfx4lJ.js";function p(){return e.jsx(t,{title:"An example showing how intersection observer can be used in React",template:"react",customSetup:{dependencies:{"react-intersection-observer":"9.5.2"}},files:{"/App.js":`import { useInView } from 'react-intersection-observer'

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
