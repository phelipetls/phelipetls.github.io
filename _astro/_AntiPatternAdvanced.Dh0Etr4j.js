import{j as t}from"./tw-merge.D6bB7Zk8.js";import{S as e}from"./Sandpack.BNgqq2D6.js";import{d as o}from"./index.BxBVU389.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function l(){return t.jsx(e,{title:"Anti-pattern: Advanced issues with watch and setValue",template:"react",shouldShowConsole:!0,customSetup:{dependencies:{"react-hook-form":"7.51.0"}},files:{"/App.js":{code:o`
            import { useForm } from 'react-hook-form';

            function App() {
              const { watch, setValue, formState, setFocus } = useForm({
                defaultValues: { name: '' }
              });
              const name = watch('name');

              return (
                <div>
                  <label>
                    Name: <input
                      value={name}
                      onChange={(e) => setValue('name', e.target.value)}
                    />
                  </label>
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
          `}}})}export{l as default};
