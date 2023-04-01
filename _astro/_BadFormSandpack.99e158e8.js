import{S as t,d as e}from"./index.43186375.js";import{j as r}from"./jsx-runtime.7a8c40fc.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./types-965d4afd.f5669dee.js";import"./Tab.e3ea653a.js";import"./createReactComponent.099c7328.js";import"./CopyCodeBlockButton.5df0af12.js";import"./index.ffa87b56.js";import"./floating-ui.dom.esm.5aa821b1.js";function c(){return r.jsx(t,{template:"react",files:{"/App.js":e`
           import { useState } from 'react'

           export default function App() {
             const [username, setUsername] = useState('')

             const handleSubmit = () => {
               alert(\`Ok, \${username}, I sent your data to our server ✨\`)
             }

             return (
               <div>
                 <div>
                   What's your name?
                   <input
                     placeholder="Enter your name..."
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                   />
                 </div>

                 <button onClick={handleSubmit}>Submit</button>
               </div>
             )
           }
        `}})}export{c as default};
