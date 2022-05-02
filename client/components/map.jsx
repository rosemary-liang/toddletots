import React, { useContext } from 'react';
import Search from './search';
import Carousel from './carousel';
import HomeContext from '../lib/home-context';
import AppContext from '../lib/app-context';

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

export default function Map() {
  const homeContext = useContext(HomeContext);
  const activities = homeContext.activities;
  // console.log(activities);
  // const center = homeContext.currentCoordinates;
  const center = { lat: 33.6846, lng: -117.8265 };

  const appContext = useContext(AppContext);
  const path = appContext.route.path;

  const [markers, setMarker] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback(event => {
    setMarker(current => [

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
    mapRef.current.setZoom(13);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
    libraries
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps...';

  if (path === '') {
    return (
    <div
    className='container ps-5 row d-flex justify-content-center w-100'>
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
              <div className='home-map mt-3'>
                <Carousel images={selected.images} />
              </div>
            </div>
        </InfoWindow>)
          : null}

      </GoogleMap>
    </div>
    );
  }

  if (path === 'new-entry-map') {
    return (
      <div
        className='container ps-5 row d-flex justify-content-center w-100'>
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
              key={marker.time}
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
                <h6 className='text-brown fw-bold'>{selected.activityName}</h6>
                <p className='m-0'>{selected.streetAddress}</p>
                <p>{selected.city}</p>
                <a href={`#activity-details?activityId=${selected.activityId}`}
                  className='text-decoration-none px-2 py-1 bg-primary text-white fw-bold border-radius-10px my-2'>see activity details</a>
                <div className='home-map mt-3'>
                  <Carousel images={selected.images} />
                </div>

              </div>
            </InfoWindow>)
            : null}

        </GoogleMap>
      </div>
    );
  }
}
