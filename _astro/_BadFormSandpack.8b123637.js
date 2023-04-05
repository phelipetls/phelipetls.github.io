import{S as t,d as e}from"./index.9c00d5e3.js";import{j as r}from"./jsx-runtime.7a8c40fc.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tabs.096bc574.js";import"./createReactComponent.099c7328.js";import"./CopyCodeBlockButton.ce6a0b11.js";import"./index.ffa87b56.js";import"./floating-ui.dom.browser.min.8b9d8992.js";function l(){return r.jsx(t,{template:"react",files:{"/App.js":e`
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
        `}})}export{l as default};
