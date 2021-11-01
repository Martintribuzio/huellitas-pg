
import Feed from './Feed';
import Filters from './Filters';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';

export default function Home() {
  return (
    <div>
      {/* navBar */}
      <Filters />
      <SearchBar />
      <Feed />
    </div>
  );
}

