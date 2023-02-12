import{S as e,d as t}from"./index.610ad28f.js";import{j as a}from"./jsx-runtime.c931ae04.js";import"./index.385e17fc.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.2ec63c9a.js";import"./createReactComponent.b6a655c0.js";import"./CopyCodeBlockButton.2439efb8.js";import"./index.3b45fd04.js";function s(){return a.jsx(e,{template:"react",files:{"/App.js":t`
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
        `}})}export{s as default};
