import Feed from './Feed';
import Filters from './Filters';
import { Modal } from './Modal';
import PostAPet from './PostAPet';
import { useModal } from '../hooks/useModal';

export default function Home() {
  const [isOpen, openModal, closeModal] = useModal();

  return (
    <div style={{ minHeight: '71vh', height: 'max-content' }}>
      {/* navBar */}
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
