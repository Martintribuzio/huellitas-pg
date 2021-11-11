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

import { ChangeEvent } from 'react';
import { FormEvent } from 'react';


type Data = {
  name: string | any;
  email: string | any;
  /* username: string; */
  password: string | any;
  confirmPassword: string | any;
  phone: string | any;
  address: string | any;
  description: string | any;
  instagram: string | any;
  facebook: string | any;
  website: string | any;
  profileImage: string | any;
  latitude: string | any;
  longitude: string | any;
};

const schema = yup.object().shape({
  name: yup.string().required('Ingresa tu nombre'),
  description: yup.string().required('Ingresa una descripcion'),
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


  function handleChangeImg(e: ChangeEvent<HTMLInputElement> | Event) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImg(file);
  }

  async function handleSubmitForm(data: FormEvent<HTMLFormElement>) {
    data.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      address,
      description,
      instagram,
      facebook,
      website,
      latitude,
      longitude,
    } = data.currentTarget.elements as unknown as Data;
    const formData:Data = {
      name: name['value'],
      email: email['value'],
      password: password['value'],
      confirmPassword: confirmPassword['value'],
      phone: phone['value'],
      address: address['value'],
      description: description['value'],
      instagram: instagram['value'],
      facebook: facebook['value'],
      website: website['value'],
      profileImage: img,
      latitude: latitude['value'],
      longitude: longitude['value'],
    };
    axios
      .post('/user/signup', formData,{
        headers: {'Content-Type': 'multipart/form-data'}
      })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Ahora puedes iniciar sesión',
          showConfirmButton: false,
          timer: 1500,
        });
        inicio();
      })
      .catch(err => {
        console.log(err);
        /* Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Algo salió mal',
          showConfirmButton: false,
          timer: 1500,
        }); */
      // });
  }
      )}

  return (
    <Box sx={{ backgroundColor: '#F5F5F5' }}>
      <Typography
        variant='h4'
        style={{ color: '#4A4A4A', marginBottom: '10px' }}>
        Regístrate
      </Typography>

      <form onSubmit={data => handleSubmitForm(data)}>

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
        <div>
          <Controller
            name='latitude'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Latitud'
                variant='outlined'
                error={!!errors.latitude}
                helperText={errors.latitude ? errors.latitude.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
        </div>
        <div>
          <Controller
            name='longitude'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                label='Longitud'
                variant='outlined'
                error={!!errors.longitude}
                helperText={errors.longitude ? errors.longitude.message : ''}
                fullWidth
                margin='dense'
              />
            )}
          />
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
