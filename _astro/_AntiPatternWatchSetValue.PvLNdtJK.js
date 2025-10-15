import{j as e}from"./tw-merge.D6bB7Zk8.js";import{S as t}from"./Sandpack.BNgqq2D6.js";import{d as r}from"./index.BxBVU389.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function s(){return e.jsx(t,{title:"Anti-pattern: Using watch and setValue for controlled input",template:"react",customSetup:{dependencies:{"react-hook-form":"7.51.0"}},files:{"/App.js":{code:r`
            import { useForm } from 'react-hook-form';

            let rerenderCount = 0

            function App() {
              rerenderCount++
              const { watch, setValue } = useForm({ defaultValues: { name: '' } });
              const name = watch('name');

              return (
                <>
                  <label>
                    Name: <input
                      value={name}
                      onChange={(e) => {
                        setValue('name', e.target.value);
                      }}
                    />
                  </label>
                  <br />Re-renders: {rerenderCount}
                </>
              );
            }

            export default App;
          `}}})}export{s as default};
