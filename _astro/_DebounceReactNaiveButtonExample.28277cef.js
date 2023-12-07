import{j as t}from"./tw-merge.dd1f01ef.js";import{S as o}from"./Sandpack.fc9f7533.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.4305fca2.js";import"./IconButton.21971510.js";function p(e){return t.jsx(o,{...e,title:"Implementing debounced event handler in React in a naive way",template:"react",files:{"/App.js":`import { debounce } from './debounce.js'

export default function App() {
  return <button onClick={debounce(() => console.log('I ran'), 300)}>Click me</button>
}
`,"/debounce.js":e.debounceCode}})}export{p as default};
