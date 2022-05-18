import React, { useContext } from 'react';
import _ from 'lodash';
import Search from './search';
import Carousel from './carousel';
import { AppContext, mapStyles } from '../lib';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '65vh'

};
const options = {
  styles: mapStyles,
  disableDefaultUI: true

};

export default function Map({ view }) {
  const context = useContext(AppContext);
  const { activities, bookmarks, currentCoordinates } = context;
  const path = context.route.path;
  const center = currentCoordinates;

  const [markers, setMarker] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const pin = {};

  const useSelectedAddress = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${selected.lat},${selected.lng}&key=${process.env.GOOGLE_MAPS_KEY}`)
      .then(result => result.json())
      .then(data => {
        const streetAddressElement = data.results.find(element => element.types.includes('street_address'));
        let formattedStreetAddress;

        if (streetAddressElement) {
          formattedStreetAddress = _.split(streetAddressElement.formatted_address, ', ');
        }
        if (!streetAddressElement) {
          const premiseElement = data.results.find(element => element.types.includes('premise'));
          formattedStreetAddress = _.split(premiseElement.formatted_address, ', ');
        }

        const stateAndZip = _.split(formattedStreetAddress[2], ' ');
        const zip = stateAndZip[1];
        pin.streetAddress = formattedStreetAddress[0];
        pin.city = formattedStreetAddress[1];
        pin.zipCode = zip;
        pin.currentCoordinates = {
          lat: selected.lat,
          lng: selected.lng
        };
        context.setNewActivityPin(pin);
      })
      .catch(err => console.error(err));
  };

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

  let activitiesList;
  if (path === '' || path === 'bookmarks') {
    if (path === '') {
      activitiesList = activities;
    }
    if (path === 'bookmarks') {
      activitiesList = bookmarks;
    }

    return (
      <>
        <div className='container px-3'>
          <Search panTo={panTo} view={view} />
          </div>

        <div
        className='container ps-5 row d-flex justify-content-center w-100'>
          <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          options={options}
          onLoad={onMapLoad}
          >
            {activitiesList.map(activity => (
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
      </>
    );
  }

  if (path === 'new-entry-map') {
    return (
      <div
        className='container ps-5 row d-flex justify-content-center w-100'>
        <Search panTo={panTo} view={view} />
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
              <div className='my-2'>
                <a href="#new-entry-form" onClick={useSelectedAddress} className='text-decoration-none px-2 py-1 fw-bold text-white bg-secondary border-radius-90px'> Add new activity here</a>
              </div>
            </InfoWindow>)
            : null}

        </GoogleMap>
      </div>
    );
  }
}
