import{S as e,d as t}from"./index.9c00d5e3.js";import{j as a}from"./jsx-runtime.7a8c40fc.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tabs.096bc574.js";import"./createReactComponent.099c7328.js";import"./CopyCodeBlockButton.ce6a0b11.js";import"./index.ffa87b56.js";import"./floating-ui.dom.browser.min.8b9d8992.js";function b(){return a.jsx(e,{template:"react",files:{"/App.js":t`
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
