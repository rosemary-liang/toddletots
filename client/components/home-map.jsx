import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '500px', width: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    )}
  </GoogleMap>
));

export default class HomeMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = { center: this.props.currentCoordinates };
  }

  render() {
    return (
    <MyMapComponent />
    );
  }
}

// import React from 'react';
// import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// import mapStyles from '../lib/map-styles';

// const libraries = ['places'];
// const mapContainerStyle = {
//   width: '100vw',
//   height: '100vh'

// };
// const options = {
//   styles: mapStyles,
//   disableDefaultUI: true

// };

// export default function HomeMap(props) {
//   // const center = props.currentCoordinates;
//   const center = {
//     lat: 33.669445,
//     lng: -117.823059,
//     zoomControl: true
//   };
//   const [markers, setMarkers] = React.useState([]);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
//     libraries
//   });

//   if (loadError) return 'Error loading maps';
//   if (!isLoaded) return 'Loading maps...';

//   return (
//     <div
//     className='container p-2'>
//       <GoogleMap
//       mapContainerStyle={mapContainerStyle}
//       zoom={8}
//       center={center}
//       options={options}

//       // onClick={event => {
//       //   setMarkers(current => [
//       //     ...current,
//       //     {
//       //       lat: event.latLng.lat(),
//       //       lng: event.latLng.lng(),
//       //       time: new Date()
//       //     }
//       //   ]);

//       // }}
//       >
//         {/* {markers.map(marker => (
//         <Marker
//         key={marker.time.toISOString()}
//         position={{ lat: marker.lat, lng: marker.lng }}
//         />
//         ))} */}

//       </GoogleMap>
//     </div>

//   );
// }
