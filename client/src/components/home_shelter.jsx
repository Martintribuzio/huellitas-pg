import Feed_shelter from './Feed_shelter'
import { useModal } from '../hooks/useModal';
import LocationMap from './LocationMap/LocationMap';
import huella  from "../assets/map/huellitasLost.png";
import huellaAdopt  from "../assets/map/huellitaAdoption.png";
import signodeex  from "../assets/map/huellitasFounded.png";

export default function Home() {
  const [isOpen, openModal, closeModal] = useModal();

  return (
    <div style={{ minHeight: '71vh', height: 'max-content' }}>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', justifyContent: 'center', marginTop: '30px'}}>
        <label><img style={{width: "30px", height: '30px'}} src={huella}></img>Perdido</label>
        <label><img style={{width: "30px", height: '30px'}} src={huellaAdopt}></img>En adopcion</label>
        <label><img style={{width: "30px", height: '30px'}} src={signodeex}></img>Encontrado</label>
      </div>
      <LocationMap/>

      <Feed_shelter isOpen={isOpen} />
    </div>
  );
}
