import Feed from './Feed';
import Filters from './Filters';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* navBar */}
      <Filters />
      <Feed />
    </div>
  );
}
