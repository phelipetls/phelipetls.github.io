import{j as t}from"./tw-merge.D6bB7Zk8.js";import{S as e}from"./Sandpack.BNgqq2D6.js";import{d as r}from"./index.BxBVU389.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function l(){return t.jsx(e,{title:"Good pattern: Using handleSubmit",template:"react",customSetup:{dependencies:{"react-hook-form":"7.51.0"}},files:{"/App.js":{code:r`
            import { useForm } from 'react-hook-form';

            function App() {
              const { register, handleSubmit, formState: { errors, submitCount } } = useForm({
                defaultValues: { email: '', password: '' }
              });

              const onSubmit = (data) => {
                // Simulate API call
                alert('Form submitted ' + submitCount + ' times with: ' + JSON.stringify(data));
              };

              return (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label>Email:</label>
                    <input
                      {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <div>{errors.email.message}</div>}
                  </div>
                  <div>
                    <label>Password:</label>
                    <input
                      {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                      type="password"
                    />
                    {errors.password && <div>{errors.password.message}</div>}
                  </div>
                  <button type="submit">Submit</button>
                </form>
              );
            }

            export default App;
          `}}})}export{l as default};
