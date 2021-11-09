import Feed from './Feed';
import Filters from './Filters';
import { Modal } from './Modal';
import PostAPet from './PostAPet';
import { useModal } from '../hooks/useModal';
import LocationMap from './LocationMap/LocationMap';
import huella  from "../assets/home/pngegg.png";
import huellaAdopt  from "../assets/home/elqva.png";
import signodeex  from "../assets/home/signodeex.png";

export default function Home() {
  const [isOpen, openModal, closeModal] = useModal();

  return (
    <div style={{ minHeight: '71vh', height: 'max-content' }}>
      {/* navBar */}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', justifyContent: 'center'}}>
        <label><img style={{width: "25px", height: '25px'}} src={huella}></img>Perdido</label>
        <label><img style={{width: "28px", height: '25px'}} src={huellaAdopt}></img>En adopcion</label>
        <label><img style={{width: "28px", height: '25px'}} src={signodeex}></img>Encontrado</label>
      </div>
      <LocationMap/>
      <button
        style={{
          width: '150px',
          height: '50px',
          border: '1px solid gray',
          backgroundColor: 'white',
          color: 'gray',
        }}
        onClick={openModal}>
        CREAR POST
      </button>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <PostAPet isOpen={isOpen} closeModal={closeModal} />
      </Modal>

      <Filters />
      <Feed isOpen={isOpen} />
    </div>
  );
}
