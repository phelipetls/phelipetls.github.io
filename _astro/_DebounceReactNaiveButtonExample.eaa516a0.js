import{j as t}from"./tw-merge.d8067f3d.js";import{S as o}from"./Sandpack.48ee3edd.js";import"./index.a2a0beca.js";import"./_commonjsHelpers.de833af9.js";import"./Tab.7a91ada5.js";import"./CopyCodeBlockButton.c533e2fc.js";import"./createLucideIcon.85dada26.js";function u(e){return t.jsx(o,{...e,title:"Implementing debounced event handler in React in a naive way",template:"react",files:{"/App.js":`import { debounce } from './debounce.js'

export default function App() {
  return <button onClick={debounce(() => console.log('I ran'), 300)}>Click me</button>
}
`,"/debounce.js":e.debounceCode}})}export{u as default};
