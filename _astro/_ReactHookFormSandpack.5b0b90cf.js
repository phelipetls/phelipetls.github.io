import{j as t}from"./tw-merge.d8067f3d.js";import{S as e}from"./Sandpack.9ba44f2b.js";import{d as r}from"./index.8aa7c818.js";import"./index.a2a0beca.js";import"./_commonjsHelpers.de833af9.js";import"./Tab.7a91ada5.js";import"./CopyCodeBlockButton.c533e2fc.js";import"./createLucideIcon.85dada26.js";function l(){return t.jsx(e,{template:"react",files:{"/App.js":r`
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
      `},customSetup:{dependencies:{react:"^18.0.0","react-dom":"^18.0.0","react-hook-form":"^7.39.5"}}})}export{l as default};
