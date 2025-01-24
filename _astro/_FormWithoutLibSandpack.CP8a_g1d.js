import{j as e}from"./tw-merge.BX59QNfr.js";import{S as t}from"./Sandpack.D8BFDkvd.js";import{d as a}from"./index.BxBVU389.js";import"./index.v9NO2EbV.js";import"./Tab.C2zSSDam.js";import"./CopyCodeBlockButton.CXK7bwpi.js";import"./createLucideIcon.Cfxfx4lJ.js";function p(){return e.jsx(t,{template:"react",files:{"/App.js":a`
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
