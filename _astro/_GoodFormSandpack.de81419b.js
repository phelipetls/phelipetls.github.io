import{S as t,d as e}from"./index.df1b42e1.js";import{j as r}from"./jsx-runtime.0673f7bd.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.a9c2365b.js";import"./CopyCodeBlockButton.b02e9558.js";import"./index.ffa87b56.js";import"./createLucideIcon.e5a06aca.js";import"./floating-ui.dom.browser.min.0e955118.js";function d(){return r.jsx(t,{template:"react",files:{"/App.js":e`
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
        `}})}export{d as default};
