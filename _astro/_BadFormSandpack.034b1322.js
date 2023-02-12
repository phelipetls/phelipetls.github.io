import{S as t,d as e}from"./index.610ad28f.js";import{j as r}from"./jsx-runtime.c931ae04.js";import"./index.385e17fc.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.2ec63c9a.js";import"./createReactComponent.b6a655c0.js";import"./CopyCodeBlockButton.2439efb8.js";import"./index.3b45fd04.js";function d(){return r.jsx(t,{template:"react",files:{"/App.js":e`
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
        `}})}export{d as default};
