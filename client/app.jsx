import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import './scss/style.scss';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
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

  render() {
    return (
      <>
      <div className="container rounded bg-primary">
        <Header />
          {/* // {this.renderPage()} */}
      </div>
      </>

    );
  }
}
