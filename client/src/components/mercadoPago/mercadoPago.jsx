import axios from 'axios';
import { useState } from 'react';


function MePa() {
    const [price, setPrice] = useState();
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
    openWindow(res.data.url);

}

const openWindow = (url) => {
    window.open(url);
}

  return (
      <div>
    <form onSubmit={submit}>
        <label>DONAR</label>
        <input type="number" name="price" min='0' placeholder="monto a donar" value={price} onChange={change} />
        <button type="submit">Donar</button>
    </form>
    </div>
  )
}

export default MePa;
