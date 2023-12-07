import{j as e}from"./tw-merge.dd1f01ef.js";import{S as t}from"./Sandpack.fc9f7533.js";import{d as r}from"./index.8aa7c818.js";import"./index.6460afdd.js";import"./Tab.497d6dce.js";import"./CopyCodeBlockButton.4305fca2.js";import"./IconButton.21971510.js";function l(){return e.jsx(t,{template:"react",files:{"/App.js":r`
           export default function App() {
             const handleSubmit = (e) => {
               e.preventDefault()
               const username = e.target.elements['username'].value
               alert(\`Ok, \${username}, I sent your data to our server ✨\`)
             }

             return (
               <form onSubmit={handleSubmit}>
                 <label>
                   What's your name?
                   <input name="username" placeholder="Enter your name..." />
                 </label>

                 <button>Submit</button>
               </form>
             )
           }
        `}})}export{l as default};
