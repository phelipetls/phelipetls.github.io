import{j as e}from"./tw-merge.D6bB7Zk8.js";import{S as r}from"./Sandpack.BNgqq2D6.js";import{d as t}from"./index.BxBVU389.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function p(){return e.jsx(r,{title:"Good pattern: Using reValidateMode",template:"react",customSetup:{dependencies:{"react-hook-form":"7.51.0"}},files:{"/App.js":{code:t`
            import { useForm } from 'react-hook-form';

            function App() {
              const { register, formState: { errors } } = useForm({
                defaultValues: { email: '', password: '' },
                mode: 'onChange',
                reValidateMode: 'onChange'
              });

              return (
                <form>
                  <div>
                    <label>Email:</label>
                    <input
                      {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
                  </div>
                  <div>
                    <label>Password:</label>
                    <input
                      {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                      type="password"
                    />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
                  </div>
                  <button type="submit">Submit</button>
                </form>
              );
            }

            export default App;
          `}}})}export{p as default};
