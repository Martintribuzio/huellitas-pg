import React from 'react';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';
import Swal from 'sweetalert2';
import './Register.css';
import Box from '@mui/material/Box';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import Button from '@mui/material/Button';

type Data = {
  name: string;
  lastname: string;
  email: string;
  /* username: string; */
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required('Ingresa tu nombre'),
  lastname: yup.string().required('Ingresa tu apellido'),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required(),
});

function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schema) });

  const responseGoogle = (response: any) => {
    console.log(response);
    axios
      .post('http://localhost:3001/user/signup', {
        name: response.profileObj.givenName,
        lastname: response.profileObj.familyName,
        email: response.profileObj.email,
        password: response.profileObj.googleId,
        confirmPassword: response.profileObj.googleId,
      })
      .then(res => {
        console.log(res);
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Ahora puedes iniciar sesión',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo registrar',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  };

  const onSubmit = handleSubmit(data => {
    console.log(document.getElementById('password'));
    axios
      .post('http://localhost:3001/user/signup', data)
      .then(async res => {
        Swal.fire({
          title: 'Success!',
          text: 'Fuiste registrado con éxito',
          icon: 'success',
          confirmButtonText: 'Ingresá',
        });
        console.log(res);
      })
      .catch(error => console.log(error.message));
  });

  return (
    <Box sx={{ backgroundColor: 'white' }} className='container'>
      <h1>Regístrate</h1>
      <form onSubmit={onSubmit}>
        <div>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Nombre'
                variant='outlined'
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>
        <div>
          <Controller
            name='lastname'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Apellido'
                variant='outlined'
                error={!!errors.lastname}
                helperText={errors.lastname ? errors.lastname.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>

        <div>
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
                helperText={errors.email ? errors.email.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>
        {/*  <div>
        <input {...register('username',{ required: true })} id="username" name="username" type="text" placeholder='Usuario'/>
      </div> */}
        <div>
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
        <div>
          <Controller
            name='confirmPassword'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                type='password'
                label='Confirma tu contraseña'
                variant='outlined'
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ''
                }
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>
        <Button variant='contained' type='submit'>
          Registrar
        </Button>
      </form>
      <GoogleLogin
        clientId='73850795306-qqjla4o7l7d8mha6209tu8h87asqu073.apps.googleusercontent.com'
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </Box>
  );
}

export default Register;
