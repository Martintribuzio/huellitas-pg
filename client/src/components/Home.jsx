import Feed from './Feed';
import Filters from './Filters';
import { Modal } from './Modal';
import PostAPet from './PostAPet';
import { useModal } from '../hooks/useModal';
import LocationMap from './LocationMap/LocationMap';
import huella  from "../assets/map/huellitasLost.png";
import huellaAdopt  from "../assets/map/huellitaAdoption.png";
import signodeex  from "../assets/map/huellitasFounded.png";
import sty from '../CSS/Home.module.css'
import { Button } from '@mui/material';

export default function Home() {
  const [isOpen, openModal, closeModal] = useModal();

  return (
    <div style={{ minHeight: '71vh', height: 'max-content' }}>
      {/* navBar */}
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px', justifyContent: 'center', marginTop: '30px'}}>
        <label><img style={{width: "30px", height: '30px'}} src={huella} alt=""></img>Perdido</label>
        <label><img style={{width: "30px", height: '30px'}} src={huellaAdopt} alt=""></img>En adopción</label>
        <label><img style={{width: "30px", height: '30px'}} src={signodeex} alt=""></img>Encontrado</label>
      </div>
      <LocationMap/>
      <Button
      className={sty.button}
        style={{
          width: '150px',
          height: '50px',
        }}
        variant='outlined'
        onClick={openModal}>
        CREAR PUBLICACIÓN
      </Button>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <PostAPet isOpen={isOpen} closeModal={closeModal} />
      </Modal>

      <Filters />
      <Feed isOpen={isOpen} />
    </div>
  );
}
