import{S as e,d as t}from"./chunks/index.60fe852b.js";import{j as r}from"./chunks/tw-merge.ef383cd6.js";import"./chunks/index.8dbfd31f.js";import"./chunks/_commonjsHelpers.37791fd4.js";import"./chunks/Tab.2d86fb89.js";import"./chunks/createReactComponent.8a376ebc.js";import"./CopyCodeBlockButton.cbf359cc.js";import"./chunks/index.d39fc9d8.js";function l(){return r.exports.jsx(e,{template:"react",files:{"/App.js":t`
           export default function App() {
             const handleSubmit = (e) => {
               e.preventDefault()
               const username = e.target.elements['username'].value
               alert(\`Ok, \${username}, I sent your data to our server ✨\`)
             }

             return (
               <form onSubmit={handleSubmit}>
                 <label>
                   What's your name?
                   <input name="username" placeholder="Enter your name..." />
                 </label>

                 <button>Submit</button>
               </form>
             )
           }
        `}})}export{l as default};
