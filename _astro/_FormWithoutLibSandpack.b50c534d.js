import{S as e,d as t}from"./index.df1b42e1.js";import{j as a}from"./jsx-runtime.0673f7bd.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.a9c2365b.js";import"./CopyCodeBlockButton.b02e9558.js";import"./index.ffa87b56.js";import"./createLucideIcon.e5a06aca.js";import"./floating-ui.dom.browser.min.0e955118.js";function b(){return a.jsx(e,{template:"react",files:{"/App.js":t`
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
        `}})}export{b as default};
