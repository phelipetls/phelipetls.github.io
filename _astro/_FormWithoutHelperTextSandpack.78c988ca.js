import{S as e,d as t}from"./index.610ad28f.js";import{j as r}from"./jsx-runtime.c931ae04.js";import"./index.385e17fc.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.2ec63c9a.js";import"./createReactComponent.b6a655c0.js";import"./CopyCodeBlockButton.2439efb8.js";import"./index.3b45fd04.js";function p(){return r.jsx(e,{template:"react",files:{"/App.js":t`
           import { useState } from 'react'

           export default function App() {
             const [username, setUsername] = useState('')

             let errorMessage = ''

             if (username && !/^[A-Za-z0-9]+$/.test(username)) {
               errorMessage = 'Only alphanumeric characters allowed'
             }

             const handleSubmit = (e) => {
               e.preventDefault()
               alert(\`Ok, \${username}, I sent your data to our server ✨\`)
             }

             return (
               <form onSubmit={handleSubmit}>
                 <label>
                   Username:{' '}
                   <input
                     type="text"
                     id="username"
                     name="username"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                   />
                 </label>

                 {errorMessage && (
                   <div
                     style={{
                       color: 'red',
                     }}
                   >
                     ❌ {errorMessage}
                   </div>
                 )}

                 <div
                   style={{
                     fontSize: 10,
                     color: 'grey',
                   }}
                 >
                   This is what you'll use to log in
                 </div>

                 <button>Submit</button>
               </form>
             )
           }
        `}})}export{p as default};
