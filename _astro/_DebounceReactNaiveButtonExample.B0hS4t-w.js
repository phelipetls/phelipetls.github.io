import{j as t}from"./tw-merge.BX59QNfr.js";import{S as o}from"./Sandpack.D8BFDkvd.js";import"./index.v9NO2EbV.js";import"./Tab.C2zSSDam.js";import"./CopyCodeBlockButton.CXK7bwpi.js";import"./createLucideIcon.Cfxfx4lJ.js";function p(e){return t.jsx(o,{...e,title:"Implementing debounced event handler in React in a naive way",template:"react",files:{"/App.js":`import { debounce } from './debounce.js'

export default function App() {
  return <button onClick={debounce(() => console.log('I ran'), 300)}>Click me</button>
}
`,"/debounce.js":e.debounceCode}})}export{p as default};
