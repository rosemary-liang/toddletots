import React from 'react';
import Home from './pages/home';
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
    const route = parseRoute(window.location.hash);
    this.setState({ route });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
  }

  // footer only visible on mobile
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
