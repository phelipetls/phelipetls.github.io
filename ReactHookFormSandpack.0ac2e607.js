import{S as t,d as e}from"./chunks/index.60fe852b.js";import{j as r}from"./chunks/tw-merge.ef383cd6.js";import"./chunks/index.8dbfd31f.js";import"./chunks/_commonjsHelpers.37791fd4.js";import"./chunks/Tab.2d86fb89.js";import"./chunks/createReactComponent.8a376ebc.js";import"./CopyCodeBlockButton.cbf359cc.js";import"./chunks/index.d39fc9d8.js";function l(){return r.exports.jsx(t,{template:"react",files:{"/App.js":e`
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
