import React from 'react';
import Home from './pages/home';
import AppContext from './lib/app-context';
import ActivityDetails from './pages/activity-details';
import Header from './components/header';
import Footer from './components/footer';
import './scss/style.scss';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: parseRoute(window.location.hash)
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
    const { route } = this.state;
    const contextValue = { route };
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
