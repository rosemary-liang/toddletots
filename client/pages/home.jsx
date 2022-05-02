/* globals google */
import React from 'react';
import HomeContext from '../lib/home-context';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import { withScriptjs } from 'react-google-maps';
import _ from 'lodash';
import Search from '../components/search';
// import SearchBar from '../components/searchbar';
import Carousel from '../components/carousel';
import AgeRange from '../components/age-range';
import Map from '../components/home-map';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      currentCoordinates: [],
      currentView: 'list'
    };
    this.getCurrentCoordinates = this.getCurrentCoordinates.bind(this);
    this.sortActivitiesByDistance = this.sortActivitiesByDistance.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.useCurrentLocation = this.useCurrentLocation.bind(this);
    this.handleCurrentView = this.handleCurrentView.bind(this);
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

  useCurrentLocation() {
    this.getCurrentCoordinates()
      .then(data => {
        const currentCoordinates = data.data.location;
        this.setState({ currentCoordinates }, function () {
          this.sortActivitiesByDistance();

        });
      })
      .catch(err => console.error(err));
  }

  handleZip(zipCoordinates) {
    this.setState({ currentCoordinates: zipCoordinates }, function () {
      this.sortActivitiesByDistance();
    });
  }

  handleCurrentView() {
    const currentView = this.state.currentView === 'list'
      ? 'map'
      : 'list';
    this.setState({ currentView });
  }

  render() {
    // console.log('Home this.state:', this.state);

    const { activities, currentCoordinates, currentView } = this.state;

    let id;
    let icon;
    let tooltip;
    let listDisplay;
    let mapDisplay;
    let iconClass;

    if (currentView === 'list') {
      id = 'home-map-view';
      icon = 'fa-solid fa-map text-white';
      tooltip = 'Map view';
      listDisplay = '';
      mapDisplay = 'd-none';
      iconClass = '';
    }

    if (currentView === 'map') {
      id = 'list-map-view';
      icon = 'fa-solid fa-list text-white';
      tooltip = 'List view';
      listDisplay = 'd-none';
      mapDisplay = '';
      iconClass = '';
    }

    const contextValue = { activities, currentCoordinates, currentView };

    return (
    <>
    <HomeContext.Provider value={contextValue}>
      <div className='text-decoration-none container '>
        <div className="container  ">
              {/* <SearchBar handleZip={this.handleZip}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: '100%' }} />}/> */}
            <div className="  mt-4 mx-1 mx-md-4">
              <div className=' d-flex justify-content-between h2 mb-0 w-100'>
                <p className='ms-1 text-white fw-bold'>Fun Activities Nearby</p>
                <div className={iconClass}>
                  <button onClick={this.useCurrentLocation} className='mx-2 bg-transparent border-0 text-white' data-tip data-for='use-current-location' ><i className="fa-solid fa-crosshairs"></i></button>
                  <ReactTooltip id='use-current-location' place='top' effect='solid'>Use current location</ReactTooltip>
                  <a href="#" onClick={this.handleCurrentView} data-tip data-for={id} className='me-2'>
                    <i className={icon}></i>
                  </a>
                  <ReactTooltip id={id} place='top' effect='solid'>{tooltip}</ReactTooltip>
                </div>
            </div>

            <div className={listDisplay}>
                <Search handleZip={this.handleZip}/>

              {
                this.state.activities.map(activity => (
                  <div key={activity.activityId}><Activity activity={activity} /> </div>
                ))
              }
              </div>
          </div>
        </div>
      </div>
      <div className={mapDisplay}>
        <Map currentCoordinates={this.state.currentCoordinates} />
      </div>
    </HomeContext.Provider>
    </>
    );
  }
}

function Activity(props) {
  const { activityName, images, activityId, distance, ages2to5, ages5to12 } = props.activity;

  return (
      <div onClick={() => { location.hash = `#activity-details?activityId=${activityId}`; }} className='row bg-white border-radius-20px mb-4 py-4 cursor-pointer '>
        <div className='ps-5'>
          <div className='text-brown fs-5 fw-bold'>{activityName}</div>
          <p className='text-gray fs-6 fw-bold'>{distance} miles</p>
        </div>
        <div className='d-flex justify-content-sm-center justify-content-lg-between'>
          <Carousel images={images}/>
          <AgeRange ages2to5={ages2to5} ages5to12={ages5to12} page="#" />
          </div>
      </div>
  );
}

export default withScriptjs(Home);
