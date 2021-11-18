import { TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState,ChangeEvent } from 'react';
import sty from './mercadoPago.module.css'
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';


function MePa() {
    const [price, setPrice] = useState<string>('10');
    const [desc, setDesc] = useState<string>('');
    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    }

    const submit = async (e: any) => {
    e.preventDefault();
    let title = desc;
    if(desc === ''){
        title = 'Donate';
    }
    const res = await axios.post('/mepa/donate', {
        title:title,
        price:price,
        quantity:1,
    });
    openWindow(res.data.url);

}

const openWindow = (url:string) => {
    window.location.href = url;
}

  return (
      <div className={sty.dive}>
          <Typography variant='h4'>
              ¿Quieres ayudarnos?
            </Typography>
            <Typography sx={{width:'80vw'}}>
                El equipo de Huellitas creo este proyecto sin fines le lucro pero
                si te gusta la aplicación y quieres ayudar, puedes hacer una donación.
                <br/>
                Las donaciones se utilizan para mantener el servidor de Huellitas funcionando.

            </Typography>
        <form onSubmit={submit} className={sty.form}>
            <FormControl sx={{ m: 0.5, width:'200px' }} variant="standard">
                {price[0] === '-' || price[0] === '0' ?<InputLabel error={true} htmlFor="standard-adornment-amount">Cantidad</InputLabel>:
                <InputLabel htmlFor="standard-adornment-amount">Cantidad</InputLabel>}
                <Input
                id="standard-adornment-amount"
                value={price}
                onChange={change}
                startAdornment={<InputAdornment position="start">ARS $</InputAdornment>}
            />
                {price[0] === '-' || price[0] === '0' ?<FormHelperText error={true} id="component-error-text">Error Monto invalido</FormHelperText>:null}
            </FormControl>
            <TextField
            id="standard-multiline-static"
            sx={{ m: 0.5, width:'200px' }}
            label="Dejanos un mensaje"
            multiline
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            variant="standard"
            />
            {price[0] === '-' || price[0] === '0' ?<Button type='submit' disabled={true} variant="contained">Donar</Button>:<Button type='submit' variant="contained">Donar</Button>}
        </form>
    </div>
  )
}

export default MePa;
