import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import {geosearch} from 'esri-leaflet-geocoder';
import './LocationMap.css';
import useSwr from 'swr';
import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import LeafletControlGeocoder from './LeafletControlGeocoder';
import { useDispatch } from 'react-redux';
import { getCoords } from '../../redux/actions';
import huella  from "../../assets/home/huellaMapa.png";
import {Icon} from "leaflet"
 // import { popoverClasses } from '@mui/material';

let defaultCenter = [-34.6038, -58.3816];
let defaultZoom = 13;

////////////////////////////localizacion//////////////////////////////////////////
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;
  defaultCenter = [crd.latitude, crd.longitude];
}
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);

//////////////////////////////////////////////////////////////////////////////////

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(map.getCenter());
  const dispatch = useDispatch();

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
      dispatch(getCoords(position.lat.toString(), position.lng.toString()));
    };
  }, [map, onMove, position, dispatch]);

  return (
    <>
      {/* latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button> */}
    </>
  );
}

export default function LocationMap() {

  const icon = new Icon({
    iconUrl: huella,
    iconSize: [25, 25]
  });
  const fetcher = (...args) => fetch(...args).then(response => response.json());
  const [map, setMap] = useState(null);

  //https://huellitas-pg.herokuapp.com/post
  const url = 'https://huellitas-pg.herokuapp.com/post';
  const { data, error } = useSwr(url, fetcher);
  // const posts = data && !error ? data : [];

  const [actPost, setPost] = useState(null);

  const displayMap = useMemo(() => {
    const posts = data && !error ? data : [];
    return (
      <MapContainer
        className='mapContainer'
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={false}
        whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {posts.map(post => (
          <Marker 
            key={post._id}
            
            position={[post.latitude? post.latitude : '', post.longitude? post.longitude : '']} 
            
            onClick = {setPost(post)} 
            
            icon={icon}
            >
            <Popup> 
              <div style = {{width: '200px'}}>
                {post.name? <h1>{`Nombre: ${post.name}`}</h1> : ""}
                <img style = {{width: '200px'}} src = {process.env.REACT_APP_API + "/" + post.petImage}></img>
                <h3>{`Estado: ${post.state}`}</h3>
                <h3>{`Tipo: ${post.type}`}</h3>
                <h3>{`Genero: ${post.genre}`}</h3> 
              </div>
            </Popup>
          </Marker>
            
        ))}
        <LeafletControlGeocoder />
      
      </MapContainer>
    );
  }, [data, error]);

  return (
    <>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </>
  );
}


