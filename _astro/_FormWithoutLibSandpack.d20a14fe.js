import{S as e}from"./Sandpack.ff5aabae.js";import{d as t}from"./index.8aa7c818.js";import{j as a}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.92c2aa37.js";import"./index.772d13e4.js";import"./createLucideIcon.0eda30d5.js";import"./floating-ui.dom.browser.min.b9202534.js";function f(){return a.jsx(e,{template:"react",files:{"/App.js":t`
           export default function App() {
             const handleSubmit = (e) => {
               e.preventDefault()

               const name = e.target.elements.name.value
               const age = e.target.elements.age.valueAsNumber

               alert(
                 JSON.stringify({
                   name,
                   age,
                 })
               )
             }

             return (
               <form onSubmit={handleSubmit}>
                 <label>
                   Name:
                   <input name="name" />
                 </label>

                 <div />

                 <label>
                   Age:
                   <input name="age" type="number" />
                 </label>

                 <div />

                 <button>Submit</button>
               </form>
             )
           }
        `}})}export{f as default};
