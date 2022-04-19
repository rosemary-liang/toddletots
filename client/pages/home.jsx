/* globals google */
import React from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import { withScriptjs } from 'react-google-maps';
import _ from 'lodash';
import SearchBar from '../components/searchbar';
import Carousel from '../components/carousel';
import AgeRange from '../components/age-range';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      currentCoordinates: []
    };
    this.getCurrentCoordinates = this.getCurrentCoordinates.bind(this);
    this.sortActivitiesByDistance = this.sortActivitiesByDistance.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.useCurrentLocation = this.useCurrentLocation.bind(this);
  }

  componentDidMount() {
    fetch('/api/activities')
      .then(res => res.json())
      .then(activities => {
        this.setState({ activities }, function () {
          this.useCurrentLocation();
        });
      })
      .catch(err => console.error(err));
  }

  sortActivitiesByDistance() {
    const { currentCoordinates, activities } = this.state;
    const activitiesWithDistance = activities.map(activity => {
      const activityCoordinates = { lat: activity.lat, lng: activity.lng };
      const distanceMeters = google.maps.geometry.spherical.computeDistanceBetween(currentCoordinates, activityCoordinates);
      const distanceMiles = distanceMeters * 0.000621371;
      activity.distance = distanceMiles.toFixed(1);
      return activity;
    });
    const sortedDistanceArray = _.orderBy(activitiesWithDistance, 'distance', 'asc');
    this.setState({ activities: sortedDistanceArray });

  }

  getCurrentCoordinates() {
    return axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLE_MAPS_KEY}`);
  }

  handleZip(zipCoordinates) {
    this.setState({ currentCoordinates: zipCoordinates }, function () {
      this.sortActivitiesByDistance();
    });
  }

  useCurrentLocation() {
    this.getCurrentCoordinates()
      .then(data => {
        const currentCoordinates = data.data.location;
        this.setState({ currentCoordinates }, function () {
          this.sortActivitiesByDistance(currentCoordinates);
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    // console.log('Home this.state:', this.state);

    return (
    <>
    <div className='text-decoration-none pb-5'>
      <div className="container d-flex flex-column align-items-center ">
            <SearchBar handleZip={this.handleZip}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: '100%' }} />}/>
          <div className=" row activities-container mt-4 mx-1 mx-md-4">
            <div className='title-row d-flex justify-content-between h2 mb-0'>
              <p className='ms-5 text-white fw-bold'>Fun Activities Nearby</p>
              <div>
                  <button onClick={this.useCurrentLocation} className='mx-2 bg-transparent border-0 text-white' data-tip data-for='use-current-location' ><i className="fa-solid fa-crosshairs"></i></button>
                  <ReactTooltip id='use-current-location' place='top' effect='solid'>Use current location</ReactTooltip>
                  <a href="#" data-tip data-for='home-map-view' className='me-2'>
                    <i className="fa-solid fa-map text-white"></i>
                </a>
                <ReactTooltip id='home-map-view' place='top' effect='solid'>Map view</ReactTooltip>
              </div>
          </div>
          {
            this.state.activities.map(activity => (
              <div key={activity.activityId}><Activity activity={activity} /> </div>
            ))
          }
        </div>
      </div>
    </div>
    </>
    );
  }
}

function Activity(props) {
  const { activityName, images, activityId, distance, ages2_5: ages2to5, ages5_12: ages5to12 } = props.activity;

  return (
    // this should be an anchor tag because it shows another view
    <a href={`#activity-details?activityId=${activityId}`} className='text-decoration-none'>
      <div className='container bg-white border-radius-20px mb-4 py-4'>
        <div className='ps-5'>
          <div className='text-brown fs-5 fw-bold'>{activityName}</div>
          <p className='text-gray fs-6 fw-bold'>{distance} miles</p>
        </div>
        <div className='d-flex justify-content-sm-center justify-content-lg-between'>
          <Carousel images={images}/>
          <AgeRange ages2to5={ages2to5} ages5to12={ages5to12} page="#" />
          </div>
      </div>
    </a>
  );
}

export default withScriptjs(Home);
