import{j as e}from"./tw-merge.D6bB7Zk8.js";import{S as t}from"./Sandpack.BNgqq2D6.js";import{d as r}from"./index.BxBVU389.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function d(){return e.jsx(t,{title:"Anti-pattern: Using getValues in onSubmit",template:"react",customSetup:{dependencies:{"react-hook-form":"7.51.0"}},files:{"/App.js":{code:r`
            import { useForm } from 'react-hook-form';

            function App() {
              const { register, getValues, formState: { errors, submitCount } } = useForm({
                defaultValues: { email: '', password: '' }
              });

              const handleSubmit = (e) => {
                e.preventDefault();
                const values = getValues();
                // Simulate API call
                alert('Form submitted ' + submitCount + ' times with: ' + JSON.stringify(values));
              };

              return (
                <form onSubmit={handleSubmit}>
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
          `}}})}export{d as default};
