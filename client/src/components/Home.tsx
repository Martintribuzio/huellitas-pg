import Feed from './Feed';
import Filters from './Filters';

export default function Home() {
  return (
    <div>
      {/* navBar */}
      <Filters />
      <Feed />
    </div>
  );
}
