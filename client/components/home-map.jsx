// import React from 'react';
// import { compose, withProps } from 'recompose';
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from 'react-google-maps';

// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//       `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`,
//     loadingElement: <div style={{ height: '100%' }} />,
//     containerElement: <div style={{ height: '500px', width: '100%' }} />,
//     mapElement: <div style={{ height: '100%' }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
//     {props.isMarkerShown && (
//       <Marker position={{ lat: -34.397, lng: 150.644 }} />
//     )}
//   </GoogleMap>
// ));

// export default class HomeMap extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = { center: this.props.currentCoordinates };
//   }

//   render() {
//     return (
//     <MyMapComponent />
//     );
//   }
// }

import React, { useContext } from 'react';
import Search from './search';
import HomeContext from '../lib/home-context';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

import mapStyles from '../lib/map-styles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '70vh'

};
const options = {
  styles: mapStyles,
  disableDefaultUI: true

};

export default function HomeMap() {
  const context = useContext(HomeContext);
  // const activities = context.activities;
  // console.log(activities);
  const center = context.currentCoordinates;

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback(event => {
    setMarkers(current => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date()
      }
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
    libraries
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps...';

  return (
    <div
    className='container ps-5 row d-flex justify-content-center w-100'>

      {/* <Locate panTo={panTo} /> */}
      <Search panTo={panTo} />

      <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
      >
        {markers.map(marker => (
        <Marker
        key={marker.time.toISOString()}
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={() => {
          setSelected(marker);
        }}
        />
        ))}

        {selected
          ? (<InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => { setSelected(null); }}>
            <div>
              <h2>Bear spotted!</h2>
              <p>enter activity link?</p>
            </div>
        </InfoWindow>)
          : null}

      </GoogleMap>
    </div>

  );
}
