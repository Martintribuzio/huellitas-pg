import Feed_shelter from './Feed_shelter'
import LocationMapShelter from './LocationMap/LocationMapShelter';
import huella  from "../assets/map/huellitasLost.png";
import huellaAdopt  from "../assets/map/huellitaAdoption.png";
import signodeex  from "../assets/map/huellitasFounded.png";
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

export default function Home() {
const [loading,result] = useUser();
const historty = useHistory();

useEffect(() => {
    if(result === 'Unauthorized'){
        historty.push('/login');
    }
},[result])

  return (
    <div style={{ minHeight: '71vh', height: 'max-content' }}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', justifyContent: 'center', marginTop: '30px'}}>
        <label><img style={{width: "30px", height: '30px'}} src={huella}></img>Perdido</label>
        <label><img style={{width: "30px", height: '30px'}} src={huellaAdopt}></img>En adopcion</label>
        <label><img style={{width: "30px", height: '30px'}} src={signodeex}></img>Encontrado</label>
      </div>
      {/* <LocationMapShelter /> */}

      <Feed_shelter />
    </div>
  );
}
