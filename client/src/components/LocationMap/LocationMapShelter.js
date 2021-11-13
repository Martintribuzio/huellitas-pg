import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import {geosearch} from 'esri-leaflet-geocoder';
import './LocationMap.css';
import useSwr from 'swr';
import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import LeafletControlGeocoder from './LeafletControlGeocoder';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getCoords } from '../../redux/actions';
import huella  from "../../assets/map/huellitasLost.png";

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

export default function LocationMapShelter() {

    const [url, setUrl] = useState([]);

    useEffect(() => {
        const getShelters = async () => {
          const res = await axios.get(`${process.env.REACT_APP_API}user/shelters`);
          setUrl(res.data);}
      getShelters();
    },[]);
    
  const icon = new Icon({
    iconUrl: huella,
    iconSize: [25, 25]
  });
  const fetcher = (...args) => fetch(...args).then(response => response.json());
  
  const [map, setMap] = useState(null);

  //https://huellitas-pg.herokuapp.com/post
//   const url = (await axios.get(`${process.env.REACT_APP_API}user/shelters`)).data;
 
  const { data, error } = useSwr(url, fetcher);
  // const posts = data && !error ? data : [];

//   const [actPost, setPost] = useState(null);
const displayMap = useMemo(() => {
    const shelters = data && !error ? data : [];
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
        {shelters.map(shelter => ( 
          <Marker 
            key={shelter._id}
            
            position={[shelter.latitude? shelter.latitude : '', shelter.longitude? shelter.longitude : '']} 
            
            // onClick = {setPost(post)} 
            
            icon={icon}
            >
            <Popup> 
              <div style = {{width: '200px'}}>
                {shelter.name? <h1>{`Nombre: ${shelter.name}`}</h1> : ""}
                <img style = {{width: '200px'}} src = {shelter.profileImage.url} alt=""></img>
              </div>
            </Popup>
          </Marker>
        ))}
        <LeafletControlGeocoder />
      </MapContainer>
    );
  }, [data, error, icon]);

  return (
    <>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </>
  );
}


