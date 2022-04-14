import React from 'react';
import SearchBar from '../components/searchbar';
import Carousel from '../components/carousel';

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
    // console.log('this.state.activities:', this.state.activities);

    return (
    <>
    <a href="#" className='text-decoration-none'>
      <div className="container d-flex flex-column align-items-center ">
          <SearchBar />
          <div className=" row activities-container mt-3 mx-1">
            <div className='title-row d-flex justify-content-between h3 mb-0'>
              <p className='ms-2 text-white fw-bold'>Fun Activities Nearby</p>
              <a href="#home-map-view" className='me-2'>
                  <i className="fa-solid fa-map text-white"></i>
              </a>

          </div>
          {
            this.state.activities.map(activity => (
              <div key={activity.activityId}><Activity activity={activity}/></div>
            ))
          }
        </div>
      </div>
    </a>

    </>
    );
  }
}

function Activity(props) {
  // const { activityId, activityName, description, ages2_5, ages5_12, streetAddress, city, zipCode, lat, lng, images } = props.activity;
  const { activityName, images } = props.activity;

  return (
    // this should be an anchor tag because it shows another view
    <div className='container bg-white px-5 py-4 mb-4 border-radius-20px'>
      <div className='text-brown fs-5 fw-bold'>{activityName}</div>
      <p className='text-gray fs-6 fw-bold'>1.1 miles</p>
      <Carousel images={images}/>

    </div>
  );
}
