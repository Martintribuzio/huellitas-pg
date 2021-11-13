import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';
import Swal from 'sweetalert2';
import './Register.css';
import Box from '@mui/material/Box';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Switch } from '@mui/material';

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
  email: yup.string().email().required('Ingresa tu email'),
  password: yup
    .string()
    .min(8, 'Tu contraseña debe tener al menos 8 caracteres')
    .max(20, 'Tu contraseña debe tener menos de 20 caracteres')
    .required('Ingresa tu contraseña'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Ingresa nuevamente tu contraseña'),
});

function Register({ inicio }: any) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit(data => {
    axios
      .post('/user/signup', {...data,type:'user'})
      .then(res => {
        Swal.fire({
          title: 'Exito!',
          text: 'Se ha enviado un mail de confirmacion a su correo electronico',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      })
      // .then(() => {
      //   inicio(false);
      // })
      .catch(error =>
        Swal.fire({
          title: 'Error',
          text: 'El email ingresado ya pertenece a una cuenta',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
        })
      );
  });

  return (
    <Box sx={{ backgroundColor: '#F5F5F5' }} className='container'>
      <Typography
        variant='h4'
        style={{ color: '#4A4A4A', marginBottom: '10px' }}>
        Regístrate
      </Typography>
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
        <Button
          style={{ marginTop: '20px', width: '300px' }}
          variant='contained'
          type='submit'>
          Registrar
        </Button>
      </form>
    </Box>
  );
}

export default Register;
