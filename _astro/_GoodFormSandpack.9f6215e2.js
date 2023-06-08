import{S as t}from"./Sandpack.ff5aabae.js";import{d as e}from"./index.8aa7c818.js";import{j as r}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.92c2aa37.js";import"./index.772d13e4.js";import"./createLucideIcon.0eda30d5.js";import"./floating-ui.dom.browser.min.b9202534.js";function f(){return r.jsx(t,{template:"react",files:{"/App.js":e`
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
