import axios from 'axios';
import { useState } from 'react';
import { useEffect} from 'react';	


function MercadoPago() {
    const [payment, setPayment] = useState(null);

    if(payment){
    const mp = new MercadoPago(process.env.PUBLIC_TOKEN_MEPA,{
        locate: 'es_AR'
    });

    mp.checkout({
        preference: {
            id: payment
        },
      });
    }
    

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
    setPayment(res.data.id);
    
}

  return (
    <form onSubmit={submit}>
        <label>DONAR</label>
        <input type="number" name="email" min='0' placeholder="monto a donar" value={price} onChange={change} />
        <button type="submit">Donar</button>
    </form>
  )
}

export default MercadoPago;
