import FeedShelter from './Feed_shelter'
import huella  from "../assets/map/huellitasLost.png";
import huellaAdopt  from "../assets/map/huellitaAdoption.png";
import signodeex  from "../assets/map/huellitasFounded.png";
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import LocationMapShelter from './LocationMap/LocationMapShelter';
import shelterImg from "../assets/shelter.png"

export default function Home() {
const [result] = useUser();
const history = useHistory();

useEffect(() => {
    // if(result === 'Unauthorized'){
    //     history.push('/login');
    // }
},[result,history ])

  return (
    <div style={{ minHeight: '71vh', height: 'max-content' }}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', justifyContent: 'center', marginTop: '30px'}}>
        <label><img style={{width: "50px", height: '30px'}} src={shelterImg} alt=""></img>Refugios</label>
        
      </div>
      <LocationMapShelter originPost={false} />

      <FeedShelter />
    </div>
  );
}
