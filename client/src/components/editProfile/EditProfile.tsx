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
        Editar
      </Typography>

      <form>
        <div>
          <input placeholder="Nombre"/>
        </div>
        <div>
          <input placeholder="Contraseña"/>
        </div>
        <div>
          <input placeholder="Confirmar contraseña"/>
        </div>
        <div>
          <input placeholder="Numero de telefono"/>
        </div>
        <div>
          <input placeholder="Direccion"/>
        </div>
        <div>
          <input placeholder="Descripcion"/>
        </div>
        <Button
          style={{ marginTop: '20px', width: '300px', marginBottom: '20px' }}
          variant='contained'
          type='submit'>
          Confirmar
        </Button>
      </form>
    </Box>
  );
}
