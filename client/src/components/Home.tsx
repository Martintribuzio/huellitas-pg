import { Link } from 'react-router-dom';
import Feed from './Feed';
import Filters from './Filters';

export default function Home() {
  return (
    <div style={{ minHeight: '71vh', height: 'max-content' }}>
      {/* navBar */}
      <Link to='/home/createPost'>
        <button
          style={{
            width: '150px',
            height: '50px',
            border: '1px solid gray',
            backgroundColor: 'white',
            color: 'gray',
          }}>
          CREAR POST
        </button>
      </Link>
      <Filters />
      <Feed />
    </div>
  );
}
