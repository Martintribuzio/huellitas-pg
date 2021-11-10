import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField } from '@material-ui/core';
import './Login.css';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';
import loginService from '../../services/loginService';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import dotenv from 'dotenv';
// import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Typography from '@mui/material/Typography';

dotenv.config();

type LogIn = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required('Ingrese su email'),
  password: yup.string().min(8, 'Su contraseña debe tener al menos 8 caracteres').max(20,'Su contraseña debe tener menos de 20 caracteres').required('Ingrese su contraseña'),
});

function Ingresar() {
  const history = useHistory();
  // const user = useSelector((state: typeState) => state.user);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<LogIn>({ resolver: yupResolver(schema) });

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
      history.push('/home/feed'); //aqui
    }
  });

  //Login Facebook--------------------------------------------------------------
  // const responseFacebook = async (response: any) => {
  //   let respLogin;
  //   console.log(response);
  //   try {
  //     respLogin = await loginService({
  //       email: response.email,
  //       password: response.id,
  //     });
  //     if (respLogin.success) {
  //       history.push('/home');
  //     } else {
  //       registerWithFacebook(response); //Invoco a la funcion para registrar
  //     }
  //   } catch (err: any) {
  //     return { ERROR: err };
  //   }
  // };

  // const registerWithFacebook = async (response: any) => {
  //   let respSignup: any;
  //   try {
  //     respSignup = await axios.post('/user/signup', {
  //       name: response.first_name,
  //       lastname: response.last_name,
  //       email: response.email,
  //       password: response.id,
  //     });
  //     if (respSignup.status === 200) {
  //       let respLogin = await loginService({
  //         email: response.email,
  //         password: response.id,
  //       });
  //       if (respLogin.success) {
  //         history.push('/home');
  //       }
  //     }
  //   } catch (err) {
  //     Swal.fire({
  //       title: 'Error',
  //       text: 'No se pudo registrar',
  //       icon: 'error',
  //       confirmButtonText: 'Ok',
  //     });
  //   }
  // };
  //-----------------------------------------------------------------------

  //Login Google--------------------------------------------------
  const responseGoogle = async (response: any) => {
    let respLogin;
    try {
      respLogin = await loginService({
        email: response.profileObj.email,
        password: response.profileObj.googleId,
      });
      if (respLogin.success) {
        history.push('/home/feed');
      } else {
        registerWithGoogle(response); //Invoco a la funcion para registrar
      }
    } catch (err: any) {
      return { Error: err };
    }
  };

  const registerWithGoogle = async (response: any) => {
    let respSignup: any;
    try {
      respSignup = await axios.post('/user/signup', {
        name: response.profileObj.givenName,
        lastname: response.profileObj.familyName,
        email: response.profileObj.email,
        password: response.profileObj.googleId,
        picture: response.profileObj.imageUrl,
      });
      // console.log('ok', respSignup.status);
      if (respSignup.status === 200) {
        let respLogin = await loginService({
          email: response.profileObj.email,
          password: response.profileObj.googleId,
        });
        if (respLogin.success) {
          history.push('/home/feed');
        }
      }
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo registrar',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };
  //-----------------------------------------------------------------------
  return (
    <Box sx={{ backgroundColor: '#F5F5F5' }} className='container'>
      <div>
        <Typography
          style={{ color: '#4A4A4A', marginBottom: '10px' }}
          variant='h4'>
          Ingresa
        </Typography>
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
        <Button className='loginButton' variant='contained' type='submit'>
          Ingresar
        </Button>
      </form>
      <hr className='Line' />
      <GoogleLogin
        className='googleButton'
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        buttonText='Sign up with Google'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      {/* <FacebookLogin
        appId=''
        autoLoad={false}
        fields='first_name,email,picture,last_name'
        // onClick={componentClicked}
        callback={responseFacebook}
      /> */}
    </Box>
  );
}

export default Ingresar;
