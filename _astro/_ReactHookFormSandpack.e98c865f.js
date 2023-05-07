import{S as t}from"./Sandpack.ba9d0761.js";import{d as e}from"./index.8aa7c818.js";import{j as r}from"./jsx-runtime.0673f7bd.js";import"./index.57fae3ab.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.a9c2365b.js";import"./CopyCodeBlockButton.19e542d5.js";import"./index.ffa87b56.js";import"./createLucideIcon.c1f1a886.js";import"./floating-ui.dom.browser.min.0e955118.js";function f(){return r.jsx(t,{template:"react",files:{"/App.js":e`
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
      `},customSetup:{dependencies:{react:"^18.0.0","react-dom":"^18.0.0","react-hook-form":"^7.39.5"}}})}export{f as default};
