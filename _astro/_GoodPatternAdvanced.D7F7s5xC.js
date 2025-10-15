import{j as o}from"./tw-merge.D6bB7Zk8.js";import{S as t}from"./Sandpack.BNgqq2D6.js";import{d as e}from"./index.BxBVU389.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function d(){return o.jsx(t,{title:"Good pattern: Controller handles everything properly",template:"react",shouldShowConsole:!0,customSetup:{dependencies:{"react-hook-form":"7.51.0"}},files:{"/App.js":{code:e`
            import { useForm, Controller } from 'react-hook-form';

            function App() {
              const { control, formState, setFocus } = useForm({
                defaultValues: { name: '' }
              });

              return (
                <div>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <label>
                        Name: <input {...field} />
                      </label>
                    )}
                  />
                  <br />
                  <button onClick={() => console.log('Dirty fields:', formState.dirtyFields)}>
                    Log Dirty Fields
                  </button>
                  <button onClick={() => setFocus('name')}>
                    Set Focus
                  </button>
                </div>
              );
            }

            export default App;
          `}}})}export{d as default};
