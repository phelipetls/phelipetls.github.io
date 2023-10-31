import{j as e}from"./tw-merge.d8067f3d.js";import{S as t}from"./Sandpack.8e4f3a85.js";import{d as r}from"./index.8aa7c818.js";import"./index.a2a0beca.js";import"./_commonjsHelpers.de833af9.js";import"./Tab.ef250944.js";import"./CopyCodeBlockButton.c533e2fc.js";import"./createLucideIcon.85dada26.js";function l(){return e.jsx(t,{template:"react",files:{"/App.js":r`
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
