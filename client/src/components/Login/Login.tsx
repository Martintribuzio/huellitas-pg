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
import { typeState } from '../../redux/reducers/index';
type LogIn = {
  email: string;
  password: string;
};
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
});

interface Context {
  user: string;
  token: string;
}

function Ingresar() {
  const dispatch = useDispatch();
  const user = useSelector((state: typeState) => state.user);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm<LogIn>({ resolver: yupResolver(schema) });
  const genericErrorMessage: string = 'Algo salió mal.Pruebaa nuevamente';

  const onSubmit = handleSubmit(data => {
    const { email, password } = data;
    axios
      .post('http://localhost:3001/user/login', {
        username: email,
        password: password,
      })
      .then(res => {
        console.log(res);
        console.log(res.data.token);
        dispatch(setUser(res.data.token));
      })
      .catch(err => console.log(err));
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
        <button type='submit' disabled={isSubmitting}>
          Ingresar
        </button>
      </form>
    </Box>
  );
}

export default Ingresar;
