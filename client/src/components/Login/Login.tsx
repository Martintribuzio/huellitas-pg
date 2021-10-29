import React from "react";
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import { Link } from "react-router-dom";
import {yupResolver}from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from "@material-ui/core";
import "./Login.css";

type LogIn = {
  email: string;
  password: string;
}
const schema=yup.object().shape({
  email:yup.string().email().required(),
  password:yup.string().min(8).max(20).required(),
});
function Ingresar() {
  const {
    register,
     handleSubmit,
     control,
     formState: { errors }
    } = useForm<LogIn>({resolver:yupResolver(schema)})

  const onSubmit = handleSubmit((data) => {
    /* alert(JSON.stringify(data)) */
    /* alert(register) */
    axios.post('http://localhost:3001/user/login',data)
    .then(res=>window.location.href='/home')
    .catch(error=>console.log(error.message))
  })

  return (
  <div className='container'>
    <div className='title'>
    <h1>Ingresa</h1>
    </div>
    <form onSubmit={onSubmit}>
      <div className='inputs'>
      <Controller
            name="email"
            control={control}
            defaultValue="ejemplo@email.com"
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ''}
                fullWidth
                margin="dense"
              />
            )}
          />
       {/*  <input {...register('email')} id="email" name="email" type="text" placeholder='Email'/>
        {
          errors.email && errors.email?.message&&<span>{errors.email.message}</span>
        }  */}
      
       
        {/* <input {...register('password')} id="password" name="password" type="password" placeholder='Contraseña'/>
     {errors.password && errors.password?.message&&<span>{errors.password.message}</span> }  */}
      <br />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ''}
                fullWidth
                margin="dense"
              />
            )}
          />
      </div>
      <p>¿No tienes cuenta?</p><Link to='/register'>Registrate</Link>
      <button type="submit">Ingresar</button>
    </form>
    </div>
  );
}

export default Ingresar;