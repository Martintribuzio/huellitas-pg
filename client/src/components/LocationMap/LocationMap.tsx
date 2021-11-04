import React from "react";
import {MapContainer,TileLayer, Marker, Popup} from 'react-leaflet';
import {Icon} from 'leaflet';
import "./LocationMap.css"

export default function LocationMap(){
    return(
        <MapContainer style={{ height:"400px", backgroundColor:"transparent", marginTop:"80px", marginBottom:'90px'}} center={[52, 0]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[52, 0]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}  