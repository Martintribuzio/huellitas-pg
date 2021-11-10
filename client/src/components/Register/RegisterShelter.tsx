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
import styles from '../../CSS/Register.module.css';
import { useState } from 'react';

type Data = {
  name: string;
  email: string;
  /* username: string; */
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  description: string;
  instagram: string;
  facebook: string;
  website: string;
  profileImage: string;
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

function RegisterShelter({ inicio }: any) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schema) });
  const [img, setImg] = useState<string | any>(null);

  function handleChangeImg(e: Event | any) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const file: File | any = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  }

  const onSubmit = handleSubmit(data => {
    console.log(data)
    axios
      .post('/shelter/signup', data)
      .then(async res => {
        Swal.fire({
          title: 'Success!',
          text: 'Fuiste registrado con éxito',
          icon: 'success',
          confirmButtonText: 'Ingresá',
        });
      })
      .then(() => {
        inicio(false);
      })
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
    <Box sx={{ backgroundColor: '#F5F5F5' }}>
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
        <div>
          <Controller
            name='phone'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='telefono'
                variant='outlined'
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>
        <div>
          <Controller
            name='address'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Dirección'
                variant='outlined'
                error={!!errors.address}
                helperText={errors.address ? errors.address.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>
        <div>
          <Controller
            name='description'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Descripción'
                variant='outlined'
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description.message : ''
                }
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>
        <div>
          <Controller
            name='instagram'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Instagram'
                variant='outlined'
                error={!!errors.instagram}
                helperText={errors.instagram ? errors.instagram.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>
        <div>
          <Controller
            name='facebook'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Facebook'
                variant='outlined'
                error={!!errors.facebook}
                helperText={errors.facebook ? errors.facebook.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>
        <div>
          <Controller
            name='website'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Página web'
                variant='outlined'
                error={!!errors.website}
                helperText={errors.website ? errors.website.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <label className={styles.file}>
            <input
              style={{ display: 'none' }}
              type='file'
              onChange={e => handleChangeImg(e)}
              accept='.png, .jpg'
            />
          </label>
          {img ? (
            <img
              style={{ height: '50px', margin: '5px' }}
              src={img}
              alt='img'
            />
          ) : null}
        </div>

        <Button
          style={{ marginTop: '20px', width: '300px', marginBottom: '20px' }}
          variant='contained'
          type='submit'>
          Registrar
        </Button>
      </form>
    </Box>
  );
}

export default RegisterShelter;
