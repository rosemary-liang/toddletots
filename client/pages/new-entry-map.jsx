import React from 'react';
import Map from '../components/map';
// import axios from 'axios';
// import SearchBar from '../components/searchbar';
// import ReactTooltip from 'react-tooltip';

export default class NewEntryMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCoordinates: null
    };
  }

  render() {

    return (
      <div className='text-decoration-none pb-5 bg-secondary rounded'>
        <div className="d-flex flex-column align-items-center ">
          <div className="mt-2 w-100 px-4 d-flex flex-column justify-content-center">
            <div className='d-flex justify-content-center h2 mb-0 position-relative'>
              <a href='#' className='bg-transparent border-0 h1 text-white fw-bold position-absolute top-0 start-0'><i className="fa-solid fa-arrow-left"></i></a>
              <p className='ms-5 text-white fw-bold'>Drop A Pin to Add Activity</p>
            </div>
            <div className='w-100 map-placeholder p-1 border-0'>
              <Map />
            </div>
            <div className='d-flex justify-content-center my-4'>
              <a href="#new-entry-form"><button className='px-5 py-1 bg-white border-radius-10px text-primary border-0 fw-bold shadow-sm' data-to='form'>Input address manually</button>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

// function HandleZip(zipCoordinates) {
//   this.setState({ currentCoordinates: zipCoordinates });
// }

// function UseCurrentLocation() {
//   axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLE_MAPS_KEY}`)
//     .then(data => {
//       const currentCoordinates = data.data.location;
//       this.setState({ currentCoordinates }, function () {
//         this.sortActivitiesByDistance(currentCoordinates);
//       });
//     })
//     .catch(err => console.error(err));
// }
