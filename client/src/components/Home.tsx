import Feed from './Feed';
import Filters from './Filters';
import LocationMap from './LocationMap/LocationMap';

export default function Home() {
  return (
    <div>
      {/* navBar */}
      <LocationMap/>
      <Filters />
      <Feed />
    </div>
  );
}
