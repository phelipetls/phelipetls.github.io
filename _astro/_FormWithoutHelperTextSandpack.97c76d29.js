import{j as e}from"./tw-merge.dd1f01ef.js";import{S as t}from"./Sandpack.f1ec7202.js";import{d as r}from"./index.8aa7c818.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.cb5c320d.js";import"./createLucideIcon.cbcd067e.js";function l(){return e.jsx(t,{template:"react",files:{"/App.js":r`
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
        `}})}export{l as default};
