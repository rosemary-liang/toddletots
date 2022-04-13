import React from 'react';
import SearchBar from '../components/searchbar';

// search bar
// activity list
// title ribbon with map icon
// each individual activity component (map)

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: []

    };
  }

  componentDidMount() {
    fetch('/api/activities');
  }

  render() {
    return (
    <>
    <div className="home-container d-flex justify-content-center">
        <SearchBar />
        <div className="row">
          {/* {
            this.state.activities.map(activity => (
              console.log
            ))
          } */}
        </div>
    </div>

    </>
    );
  }
}

// hash routing to # for home
