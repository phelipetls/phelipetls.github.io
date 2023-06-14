import{S as t}from"./Sandpack.46b9e468.js";import{d as e}from"./index.8aa7c818.js";import{j as r}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.83b14759.js";import"./index.772d13e4.js";import"./createLucideIcon.dae7146d.js";import"./floating-ui.dom.browser.min.b9202534.js";function c(){return r.jsx(t,{template:"react",files:{"/App.js":e`
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
