import{j as e}from"./tw-merge.D6bB7Zk8.js";import{S as r}from"./Sandpack.BNgqq2D6.js";import{d as o}from"./index.BxBVU389.js";import"./index.B1tThdBL.js";import"./Tab.DF9UlyyA.js";import"./CopyCodeBlockButton.CunNfTy3.js";import"./createLucideIcon.F6szB8ZD.js";function p(){return e.jsx(r,{title:"Good pattern: Using reValidateMode",template:"react",customSetup:{dependencies:{"react-hook-form":"7.51.0",zod:"3.22.4","@hookform/resolvers":"3.3.4"}},files:{"/App.js":{code:o`
            import { useForm } from 'react-hook-form';
            import { zodResolver } from '@hookform/resolvers/zod';
            import * as z from 'zod';

            const schema = z.object({
              email: z.string().min(1, 'Email is required').email('Invalid email'),
              password: z.string().min(6, 'Password must be at least 6 characters'),
            });

            function App() {
              const { register, formState: { errors } } = useForm({
                defaultValues: { email: '', password: '' },
                resolver: zodResolver(schema),
                mode: 'onChange',
                reValidateMode: 'onChange'
              });

              return (
                <form onSubmit={e => e.preventDefault()}>
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
