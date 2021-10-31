import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';
import './Login.css';
import { UserContext} from '../Context/UserContext';
import Box from '@mui/material/Box';
import { error } from 'console';

type LogIn = {
  email: string;
  password: string;
};
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
});

interface Context{
  user:string,
  token:string
};

function Ingresar() {
  const [userContext,setUserContext]=React.useContext(UserContext);
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm<LogIn>({ resolver: yupResolver(schema)});
  const genericErrorMessage:string = "Algo salió mal.Pruebaa nuevamente"

  const onSubmit = handleSubmit(data => {
    /* alert(JSON.stringify(data)) */
    /* alert(register) */
  
  setIsSubmitting(true);
    axios
      .post('http://localhost:3001/user/login', data)
      .then( res=>res.data)
      .then(res=>      {
        setIsSubmitting(false);
        if(!res.status){
          if(res.status===400){
            setError('email',{type:'manual',message:'El usuario no existe'})
          }else if(res.status===401){
            setError('password',{type:'manual',message:'Contraseña incorrecta'})
          }else{
            setError('email',{type:'manual', message:'Error de conexión'})
          }
        }else{
        
    setUserContext({
            user:data.user as string,
            token:data.token as string
          })
      })
      .catch(error => 
        setError('email'
        ,{type:'manual',message:genericErrorMessage})
        setIsSubmitting(false)
  });


  return (
    <Box sx={{ backgroundColor: 'secondary.main' }} className='container'>
      <div className='title'>
        <h1>Ingresa</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className='inputs'>
          <Controller
            name='email'
            control={control}
            defaultValue='ejemplo@email.com'
            render={({ field }) => (
              <TextField
                {...field}
                label='Email'
                variant='outlined'
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
        
          <br />
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                type='password'
                label='Contraseña'
                variant='outlined'
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>
        <p>¿No tienes cuenta?</p>
        <Link to='/register'>Registrate</Link>
        <button type='submit' disabled={isSubmitting}>Ingresar</button>
      </form>
    </Box>
  );
}

export default Ingresar;
