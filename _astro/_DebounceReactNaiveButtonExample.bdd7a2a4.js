import{j as t}from"./tw-merge.dd1f01ef.js";import{S as o}from"./Sandpack.5a922142.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.08bbc0f2.js";import"./IconButton.9e457559.js";function p(e){return t.jsx(o,{...e,title:"Implementing debounced event handler in React in a naive way",template:"react",files:{"/App.js":`import { debounce } from './debounce.js'

export default function App() {
  return <button onClick={debounce(() => console.log('I ran'), 300)}>Click me</button>
}
`,"/debounce.js":e.debounceCode}})}export{p as default};
