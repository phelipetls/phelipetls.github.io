import{j as e}from"./tw-merge.D6bB7Zk8.js";import{S as t}from"./Sandpack.DPrMf9JO.js";import{d as a}from"./index.BxBVU389.js";import"./index.B1tThdBL.js";import"./Tabs.DwYH9wi3.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function p(){return e.jsx(t,{template:"react",files:{"/App.js":a`
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
        `}})}export{p as default};
