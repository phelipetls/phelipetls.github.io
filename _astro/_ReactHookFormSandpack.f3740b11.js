import{j as t}from"./tw-merge.dd1f01ef.js";import{S as e}from"./Sandpack.fc9f7533.js";import{d as r}from"./index.8aa7c818.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.4305fca2.js";import"./IconButton.21971510.js";function s(){return t.jsx(e,{template:"react",files:{"/App.js":r`
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
