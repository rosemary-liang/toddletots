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
    fetch('/api/activities')
      .then(res => res.json())
      .then(activities => this.setState({ activities }));
  }

  render() {
    // console.log(this.state.activities);
    return (
    <>
    <div className="home-container d-flex justify-content-center">
        <SearchBar />
        <div className="row">
          {/* {
            this.state.activities.map(activity => (
              console.log(activity)
            ))
          } */}
        </div>
    </div>

    </>
    );
  }
}

// function Activity(props) {
//   const { activityId, activityName, description, ages2_5, ages5_12, streetAddress, city, zipCode, lat, lng } = props;
//   <h1>{props}</h1>;
// }

// hash routing to # for home
