import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';
import './Login.css';
import Box from '@mui/material/Box';
import { setUser } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import loginService from '../../services/loginService';
import { typeState } from '../../redux/reducers/index';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import Button from '@mui/material/Button';

type LogIn = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
});

function Ingresar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: typeState) => state.user);

  const {
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm<LogIn>({ resolver: yupResolver(schema) });

  // useEffect(() => {
  //   if (window.localStorage.getItem('token')) {
  //     history.push('/home');
  //   }
  // }, []);

  const onSubmit = handleSubmit(async data => {
    const response = await loginService(data);
    if (response.error) {
      setValue('email', '');
      setValue('password', '');
      Swal.fire({
        title: 'Error',
        text: 'El email o la contraseña no son válidos',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
      });
    } else {
      history.push('/home');
    }
  });

  return (
    <Box sx={{ backgroundColor: 'wihte' }} className='container'>
      <div className='title'>
        <h1>Ingresa</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className='inputs'>
          <Controller
            name='email'
            control={control}
            defaultValue=''
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
        <Button variant='contained' type='submit'>
          Ingresar
        </Button>
      </form>
    </Box>
  );
}

export default Ingresar;
