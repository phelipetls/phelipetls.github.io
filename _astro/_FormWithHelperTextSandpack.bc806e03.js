import{S as e}from"./Sandpack.2848b8bf.js";import{d as r}from"./index.8aa7c818.js";import{j as t}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.83b14759.js";import"./index.772d13e4.js";import"./createLucideIcon.dae7146d.js";import"./floating-ui.dom.browser.min.b9202534.js";function c(){return t.jsx(e,{template:"react",files:{"/App.js":r`
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
                     aria-invalid={errorMessage !== '' ? 'true' : 'false'}
                     aria-errormessage="username-errormessage"
                     aria-describedby="username-description"
                   />
                 </label>

                 {errorMessage && (
                   <div
                     id="username-errormessage"
                     style={{
                       color: 'red',
                     }}
                   >
                     ❌ {errorMessage}
                   </div>
                 )}

                 <div
                   id="username-description"
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
        `}})}export{c as default};
