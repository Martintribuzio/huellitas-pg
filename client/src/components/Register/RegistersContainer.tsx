import Register from './Register';
import RegisterShelter from './RegisterShelter';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import Typography from '@mui/material/Typography'

function RegistersContainer() {
  const [isShelter, setIsShelter] = useState(false);

  return (
    <div>
      {isShelter === true ? <Typography
        variant='h6'
        style={{ color: '#4A4A4A', marginBottom: '10px' }}>
        <Switch checked={isShelter} onChange={() => setIsShelter(!isShelter)} />{' '}
        Soy un usuario
      </Typography> : <Typography
        variant='h6'
        style={{ color: '#4A4A4A', marginBottom: '10px' }}>
        <Switch checked={isShelter} onChange={() => setIsShelter(!isShelter)} />{' '}
        Soy un refugio
      </Typography>}
      {isShelter ? <RegisterShelter /> : <Register />}
    </div>
  );
}

export default RegistersContainer;
