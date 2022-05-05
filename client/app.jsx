/* globals google */
import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { withScriptjs } from 'react-google-maps';
import Home from './pages/home';
import AppContext from './lib/app-context';
import ActivityDetails from './pages/activity-details';
import NewEntryMap from './pages/new-entry-map';
import NewEntryForm from './pages/new-entry-form';
import Header from './components/header';
import Footer from './components/footer';
import './scss/style.scss';
import { parseRoute } from './lib';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      route: parseRoute(window.location.hash),
      activities: [],
      currentCoordinates: [],
      newActivityPin: []
    };

    this.sortActivitiesByDistance = this.sortActivitiesByDistance.bind(this);
    this.useCurrentLocation = this.useCurrentLocation.bind(this);
    this.useZipCoordinates = this.useZipCoordinates.bind(this);
    this.getCurrentCoordinates = this.getCurrentCoordinates.bind(this);
    this.setNewActivityPin = this.setNewActivityPin.bind(this);
    this.refreshActivities = this.refreshActivities.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });

    this.refreshActivities();
  }

  refreshActivities() {
    fetch('/api/activities')
      .then(res => res.json())
      .then(activities => {
        this.setState({ activities }, () => {
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
        this.setState({ currentCoordinates }, () => {
          this.sortActivitiesByDistance();
        });
      })
      .catch(err => console.error(err));
  }

  useZipCoordinates(zipCoordinates) {
    this.setState({ currentCoordinates: zipCoordinates }, () => {
      this.sortActivitiesByDistance();
    });
  }

  setNewActivityPin(newActivityPin) {
    this.setState({ newActivityPin });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'activity-details') {
      const activityId = route.params.get('activityId');
      return <ActivityDetails activityId={activityId} />;
    }
    if (route.path === 'new-entry-map') {
      return <NewEntryMap />;
    }
    if (route.path === 'new-entry-form') {
      return <NewEntryForm />;
    }

  }

  render() {
    // console.log('App this.state:', this.state);
    const { useZipCoordinates, useCurrentLocation, setNewActivityPin, refreshActivities } = this;
    const { route, activities, currentCoordinates, newActivityPin, userId } = this.state;
    const contextValue = { route, activities, currentCoordinates, useZipCoordinates, useCurrentLocation, newActivityPin, setNewActivityPin, refreshActivities, userId };

    return (
      <AppContext.Provider value = {contextValue}>
        <>
        <div className="container rounded-2 bg-primary  d-flex flex-column pb-page">
          <Header />
          { this.renderPage() }
          <Footer />
        </div>
        </>
      </AppContext.Provider>

    );
  }
}

export default withScriptjs(App);
