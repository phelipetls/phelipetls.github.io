import{S as t,d as e}from"./index.b98b9e16.js";import{j as r}from"./jsx-runtime.7a8c40fc.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.e3ea653a.js";import"./createReactComponent.2e000565.js";import"./CopyCodeBlockButton.6b0fc58d.js";import"./index.ffa87b56.js";import"./floating-ui.dom.browser.min.8b9d8992.js";function d(){return r.jsx(t,{template:"react",files:{"/App.js":e`
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
