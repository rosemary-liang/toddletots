import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from '../lib/map-styles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true

};

export default function HomeMap(props) {
  // const center = props.currentCoordinates;
  const center = {
    lat: 33.669445,
    lng: -117.823059,
    zoomControl: true
  };
  const [markers, setMarkers] = React.useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
    libraries
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps...';

  return (
    <div>
      <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={options}
      onClick={event => {
        setMarkers(current => [
          ...current,
          {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date()
          }
        ]);

      }}
      >
        {markers.map(marker => (
        <Marker
        key={marker.time.toISOString()}
        position={{ lat: marker.lat, lng: marker.lng }}
        />
        ))}

      </GoogleMap>
    </div>

  );
}
