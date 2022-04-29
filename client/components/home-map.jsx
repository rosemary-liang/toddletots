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
import Carousel from './carousel';
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
  const activities = context.activities;
  // console.log(activities);
  // const center = context.currentCoordinates;
  const center = { lat: 33.6846, lng: -117.8265 };

  // const [activityMarkers, setActivityMarkers] = React.useState([activities]);
  const [selected, setSelected] = React.useState(null);

  // const onMapClick = React.useCallback(event => {
  //   setMarkers(current => [
  //     ...current,
  //     {
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //       time: new Date()
  //     }
  //   ]);
  // }, []);

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
      // onClick={onMapClick}
      onLoad={onMapLoad}
      >
        {activities.map(activity => (
        <Marker
        key={activity.activityId}
        position={{ lat: activity.lat, lng: activity.lng }}
        onClick={() => {
          setSelected(activity);
        }}
        />
        ))}

        {selected
          ? (<InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => { setSelected(null); }}>
            <div>
              <h6 className='text-brown fw-bold'>{selected.activityName}</h6>
              <p className='m-0'>{selected.streetAddress}</p>
              <p>{selected.city}</p>
              <a href={`#activity-details?activityId=${selected.activityId}`}
              className='text-decoration-none px-2 py-1 bg-primary text-white fw-bold border-radius-10px my-2'>see activity details</a>
              <div className='mt-3'>
                <Carousel images={selected.images} />
              </div>

            </div>
        </InfoWindow>)
          : null}

      </GoogleMap>
    </div>

  );
}
