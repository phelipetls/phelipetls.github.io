import{S as e,d as r}from"./index.9c00d5e3.js";import{j as t}from"./jsx-runtime.7a8c40fc.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tabs.096bc574.js";import"./createReactComponent.099c7328.js";import"./CopyCodeBlockButton.ce6a0b11.js";import"./index.ffa87b56.js";import"./floating-ui.dom.browser.min.8b9d8992.js";function d(){return t.jsx(e,{template:"react",files:{"/App.js":r`
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
        `}})}export{d as default};
