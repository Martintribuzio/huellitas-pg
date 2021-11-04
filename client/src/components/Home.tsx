import { Link } from 'react-router-dom';
import Feed from './Feed';
import Filters from './Filters';
import LocationMap from './LocationMap/LocationMap';

export default function Home() {
  return (
    <div style={{ minHeight: '71vh', height: 'max-content' }}>
      {/* navBar */}
      <LocationMap/>
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
