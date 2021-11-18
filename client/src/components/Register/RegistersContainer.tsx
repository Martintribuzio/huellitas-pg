import Register from './Register';
import RegisterShelter from './RegisterShelter';
import Switch from '@mui/material/Switch';
import { useState } from 'react';

function RegistersContainer() {
  const [isShelter, setIsShelter] = useState(false);

  return (
    <div>
      <label>
        <Switch checked={isShelter} onChange={() => setIsShelter(!isShelter)} />{' '}
        Soy un refugio
      </label>
      {isShelter ? <RegisterShelter /> : <Register />}
    </div>
  );
}

export default RegistersContainer;
