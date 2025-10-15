import{j as e}from"./tw-merge.D6bB7Zk8.js";import{S as r}from"./Sandpack.BNgqq2D6.js";import{d as o}from"./index.BxBVU389.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function u(){return e.jsx(r,{title:"Good pattern: Using Controller",template:"react",customSetup:{dependencies:{"react-hook-form":"7.51.0"}},files:{"/App.js":{code:o`
            import { useForm, Controller } from 'react-hook-form';

            let rerenderCount = 0

            function App() {
              rerenderCount++
              const { control } = useForm({ defaultValues: { name: '' } });

              return (
                <>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <label>
                        Name: <input {...field} />
                      </label>
                    )}
                  />
                  <br />Re-renders: {rerenderCount}
                </>
              );
            }

            export default App;
          `}}})}export{u as default};
