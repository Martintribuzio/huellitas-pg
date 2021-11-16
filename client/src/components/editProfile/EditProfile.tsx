import { useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';

type Data = {
    name: string | any;
    lastname: string | any;
    type: string | any;
    password: string | any;
    confirmPassword: string | any;
    phone: string | any;
    address: string | any;
    description: string | any;
    profileImage: string | any;
};

export default function EditProfile(props: any){
    
  const[usuario,setUsuario] = useState()
  
  return(
    <Box sx={{ backgroundColor: '#F5F5F5' }}>
      <Typography
        variant='h4'
        style={{ color: '#4A4A4A', marginBottom: '10px' }}>
        Regístrate
      </Typography>

      <form>

        <div>
          <input>Nombre</input>
        </div>
        <div>
          {/* <Controller
            name='password'
            defaultValue=''
          /> */}
        </div>
        <div>
          {/* <Controller
            name='confirmPassword'
            defaultValue=''
          /> */}
        </div>
        <div>
          {/* <Controller
            name='phone'
            defaultValue=''
          /> */}
        </div>
        <div>
          {/* <Controller
            name='address'
            defaultValue=''
          /> */}
        </div>
        <div>
          {/* <Controller
            name='description'
            defaultValue=''
          /> */}
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
