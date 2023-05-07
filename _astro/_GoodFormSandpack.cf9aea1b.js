import{S as t}from"./Sandpack.ba9d0761.js";import{d as e}from"./index.8aa7c818.js";import{j as r}from"./jsx-runtime.0673f7bd.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.a9c2365b.js";import"./CopyCodeBlockButton.19e542d5.js";import"./index.ffa87b56.js";import"./createLucideIcon.c1f1a886.js";import"./floating-ui.dom.browser.min.0e955118.js";function f(){return r.jsx(t,{template:"react",files:{"/App.js":e`
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
