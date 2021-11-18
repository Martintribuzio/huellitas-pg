import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TextField } from '@material-ui/core'
import Swal from 'sweetalert2'
import './Register.css'
import Box from '@mui/material/Box'
import axios from 'axios'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import styles from '../../CSS/Register.module.css'
import { useEffect, useState } from 'react'

import { ChangeEvent } from 'react'
import { FormEvent } from 'react'
import { Menu } from '@mui/material'
import LocationMapShelter from '../LocationMap/LocationMapShelter'
import { useSelector } from 'react-redux'
import { typeState } from '../../redux/reducers'
import { errorMonitor } from 'events'

type Data = {
  name: string | any
  email: string | any
  /* username: string; */
  password: string | any
  confirmPassword: string | any
  phone: string | any
  address: string | any
  description: string | any
  instagram: string | any
  facebook: string | any
  website: string | any
  profileImage: string | any
}

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
})
interface error {
  img: string;
  location: string;
}
function RegisterShelter({ inicio }: any) {
  const coordenadas = useSelector((state: typeState) => state.coordenadas)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const [input, setInput] = useState({ latitude: '', longitude: '' })
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Data>({ resolver: yupResolver(schema) })
  const [img, setImg] = useState<string | any>(null)
  const [error, seterror] = useState<error>({img:'',location:''})

  function handleChangeImg(e: ChangeEvent<HTMLInputElement> | Event) {
    const target = e.target as HTMLInputElement
    const file: File = (target.files as FileList)[0]
    seterror({ ...error, img: '' })
    setImg(file)
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }
  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }
  const menuId = 'primary-search-account-menu'
  const renderMap = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={menuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <div style={{ width: '500px' }}>
        <LocationMapShelter />
      </div>
    </Menu>
  )
  const check = () => {
    console.log(input,img)
    if (input.latitude === '' || input.longitude === '') {
      seterror({ ...error, location: 'Selecciona una ubicacion' })
    } else {
      seterror({ ...error, location: '' })
    }
    if(!img){
      seterror({ ...error, img: 'Selecciona una imagen' })
    }
    else{
      seterror({ ...error, img: '' })
    }
  }
  useEffect(() => {
    if (coordenadas.lat && coordenadas.long) {
      setInput({
        latitude: coordenadas.lat,
        longitude: coordenadas.long,
      })
    }
  }, [coordenadas])

  const onSubmit = handleSubmit(data => {
    if(input.latitude && input.longitude && img){
    const fd = new FormData()
    fd.append('name', data.name)
    fd.append('email', data.email)
    fd.append('password', data.password)
    fd.append('confirmPassword', data.confirmPassword)
    fd.append('phone', data.phone.value)
    fd.append('address', data.address.value)
    fd.append('description', data.description.value)
    fd.append('instagram', data.instagram.value)
    fd.append('facebook', data.facebook.value)
    fd.append('website', data.website.value)
    fd.append('latitude', input.latitude)
    fd.append('longitude', input.longitude)
    fd.append('profileImage', img)
    fd.append('type', 'shelter')
    axios.post('/user/signup/shelter', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => {
      Swal.fire({
        title: 'Exito!',
        text: 'Se ha enviado un mail de confirmacion a su correo electronico',
        icon: 'success',
        confirmButtonText: 'Ok',
      })
    }).catch(err => {
      Swal.fire({
        title: 'Error',
        text: 'El email ingresado ya pertenece a una cuenta',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
      })
    })
  }
  })
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
                placeholder='https://www.instagram.com/huellitas/'
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
                placeholder='https://www.facebook.com/huellitas'
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
              style={{ height: '50px', margin: '5px', borderRadius: '50%' }}
              src={URL.createObjectURL(img)}
              alt='img'
            />
          ) : null}
          {error.img ? <label>{error.img}</label> : null}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <label className={styles.loc}>
            <input style={{ display: 'none' }} onClick={handleMobileMenuOpen} />
          </label>
          {error.location ? <label>{error.location}</label> : null}
        </div>
        <Button
          style={{ marginTop: '20px', width: '300px', marginBottom: '20px' }}
          onClick={check}
          variant='contained'
          type='submit'>
          Registrar
        </Button>
      </form>
      {renderMap}
    </Box>
  )
}

export default RegisterShelter
