import{S as t}from"./Sandpack.054b0c60.js";import{d as e}from"./index.8aa7c818.js";import{j as r}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.f99687ad.js";import"./index.772d13e4.js";import"./createLucideIcon.e05d58c0.js";import"./floating-ui.dom.browser.min.b9202534.js";function f(){return r.jsx(t,{template:"react",files:{"/App.js":e`
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
        `}})}export{f as default};
