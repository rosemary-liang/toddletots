import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

ReactDOM.render(
  <App
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: '100%' }} />} />,
  document.querySelector('#root')
);
