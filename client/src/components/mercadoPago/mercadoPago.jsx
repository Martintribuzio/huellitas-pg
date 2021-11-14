import axios from 'axios';
import { useState } from 'react';
import { useEffect} from 'react';
import MercadoPago from 'mercadopago';
import { Redirect,useHistory } from 'react-router';

// const mp = new window.MercadoPago(process.env.PUBLIC_TOKEN_MEPA,{
//     locale: 'es-AR'
// });


function MePa() {
    const [url,setUrl] = useState('');
    const [price, setPrice] = useState(0);
    const change = (e) => {
        setPrice(e.target.value);
    }

    const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/mepa/donate', {
        title:'donate',
        price:price,
        quantity:1,
    });
    setUrl(res.data.url);

}

  return (
      <div>
    <form onSubmit={submit}>
        <label>DONAR</label>
        <input type="number" name="price" min='0' placeholder="monto a donar" value={price} onChange={change} />
        <button type="submit">Donar</button>
    </form>
    <a href={url}>PAGAR</a>
    </div>
  )
}

export default MePa;
