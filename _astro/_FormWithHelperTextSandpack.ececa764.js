import{j as e}from"./tw-merge.dd1f01ef.js";import{S as r}from"./Sandpack.fc9f7533.js";import{d as t}from"./index.8aa7c818.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.4305fca2.js";import"./IconButton.21971510.js";function l(){return e.jsx(r,{template:"react",files:{"/App.js":t`
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
        `}})}export{l as default};
