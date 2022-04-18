import React from 'react';
import Home from './pages/home';
import ActivityDetails from './pages/activity-details';
import Header from './components/header';
import Footer from './components/footer';
import './scss/style.scss';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      latitude: '',
      longitude: ''
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: '100%' }} />}/>;
    }
    if (route.path === 'activities') {
      const activityId = route.params.get('activityId');
      return <ActivityDetails activityId={activityId} />;
    }
  }

  render() {
    return (
      <>
      <div className="container rounded-2 bg-primary min-vh-100">
        <Header />
        { this.renderPage() }
        <Footer />
      </div>
      </>

    );
  }
}
