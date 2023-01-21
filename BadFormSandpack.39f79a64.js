import{S as t,d as e}from"./chunks/index.60fe852b.js";import{j as r}from"./chunks/tw-merge.ef383cd6.js";import"./chunks/index.8dbfd31f.js";import"./chunks/_commonjsHelpers.37791fd4.js";import"./chunks/Tab.2d86fb89.js";import"./chunks/createReactComponent.8a376ebc.js";import"./CopyCodeBlockButton.cbf359cc.js";import"./chunks/index.d39fc9d8.js";function d(){return r.exports.jsx(t,{template:"react",files:{"/App.js":e`
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
