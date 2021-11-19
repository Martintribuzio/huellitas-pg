import { useCallback, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import L from 'leaflet';

import icon from './constants';

export default function LeafletControlGeocoder({ originPost }) {
  const map = useMap();

  const [position, setPosition] = useState(map.getCenter());

  useEffect(() => {
    var geocoder = L.Control.Geocoder.nominatim();
    if (typeof URLSearchParams !== 'undefined' && Location.search) {
      // parse /?geocoder=nominatim from URL
      var params = new URLSearchParams(Location.search);
      var geocoderString = params.get('geocoder');
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn('Unsupported geocoder', geocoderString);
      }
    }

    L.Control.geocoder({
      query: '',
      placeholder: 'Search here...',
      defaultMarkGeocode: false,
      geocoder,
    })
      .on('markgeocode', function (e) {
        var latlng = e.geocode.center;
        L.marker(latlng, { icon })
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, [map]);

  map.locate({ setView: true, maxZoom: 16 });

  function onLocationFound(e) {
    var radius = e.accuracy / 2;

    // L.marker(e.latlng).addTo(map)
    //  .bindPopup("Tu estas aqui, con " + radius + " metros de aproximacion").openPopup();

    // L.circle(e.latlng, radius).addTo(map);
  }
  function onLocationError(e) {
    alert(e.message);
  }
  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);

  map.once('focus', function () {
    map.scrollWheelZoom.enable();
  });

  if (originPost === true) {
    var marker = L.marker(position, { icon }).addTo(map);

    map.on('move', function () {
      marker.setLatLng(map.getCenter());
    });
  }

  //  map.on('click', function() {
  //   if (map.scrollWheelZoom.enabled()) {
  //     map.scrollWheelZoom.disable();
  //     }
  //     else {
  //     map.scrollWheelZoom.enable();
  //     }
  //   });

  return null;
}
