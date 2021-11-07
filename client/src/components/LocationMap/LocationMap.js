import React , {useState, useCallback, useEffect, useMemo }from 'react';
import {MapContainer,TileLayer, Marker} from 'react-leaflet';
// import {geosearch} from 'esri-leaflet-geocoder'; 
import "./LocationMap.css"
import useSwr from "swr"; 
import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import LeafletControlGeocoder from "./LeafletControlGeocoder";

const fetcher = (...args) => fetch(...args).then(response => response.json());

let defaultCenter = [-34.6038, -58.3816];
let defaultZoom = 13;  

////////////////////////////localizacion//////////////////////////////////////////
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  defaultCenter = [crd.latitude, crd.longitude];
};
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);

//////////////////////////////////////////////////////////////////////////////////

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(map.getCenter())

  const onClick = useCallback(() => {
    map.setView(defaultCenter, defaultZoom)
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  )
}  


export default function LocationMap(){

    const [map, setMap] = useState(null)

    //https://huellitas-pg.herokuapp.com/post
    const url = "";
    
    const { data, error } = useSwr(url, fetcher);
    const posts = data && !error ? data : []

    const displayMap = useMemo(
      () => (
        <MapContainer
          style={{ height:"400px", backgroundColor:"transparent", marginTop:"80px", marginBottom:'90px', width:"400px"}}
          center={defaultCenter}
          zoom={defaultZoom}
          scrollWheelZoom={false}
          whenCreated={setMap}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {posts.map(post => <Marker key={post._id} position={[post.latitude, post.longitude]}/>)}
          <LeafletControlGeocoder/>
        </MapContainer>
      ),
      [],
    )
  
    return (
      <div>
        {map ? <DisplayPosition map={map} /> : null}
        {displayMap}
      </div>
    )
  }

    // return(
    //     <MapContainer style={{ height:"400px", backgroundColor:"transparent", marginTop:"80px", marginBottom:'90px'}} center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={false}>
    //         <TileLayer
    //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //         />
    //         {posts.map(post => <Marker key={post._id} position={[post.latitude, post.longitude]}/>)}
    //         <LeafletControlGeocoder/>
    //     </MapContainer> 
    // )
