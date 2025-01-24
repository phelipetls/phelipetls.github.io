import{j as t}from"./tw-merge.BX59QNfr.js";import{S as e}from"./Sandpack.D8BFDkvd.js";import{d as r}from"./index.BxBVU389.js";import"./index.v9NO2EbV.js";import"./Tab.C2zSSDam.js";import"./CopyCodeBlockButton.CXK7bwpi.js";import"./createLucideIcon.Cfxfx4lJ.js";function s(){return t.jsx(e,{template:"react",files:{"/App.js":r`
           import { useForm } from 'react-hook-form'

           export default function App() {
             const { handleSubmit, register } = useForm()

             const onSubmit = (d) => {
               alert(JSON.stringify(d))
             }

             return (
               <form onSubmit={handleSubmit(onSubmit)}>
                 <label>
                   Name:
                   <input {...register('name')} />
                 </label>

                 <div />

                 <label>
                   Age:
                   <input
                     type="number"
                     {...register('age', {
                       valueAsNumber: true,
                     })}
                   />
                 </label>

                 <div />

                 <button>Submit</button>
               </form>
             )
           }
      `},customSetup:{dependencies:{react:"^18.0.0","react-dom":"^18.0.0","react-hook-form":"^7.39.5"}}})}export{s as default};
