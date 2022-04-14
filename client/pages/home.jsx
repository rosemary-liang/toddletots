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
          <div className=" row activities-container mt-4 mx-1 mx-md-4">
            <div className='title-row d-flex justify-content-between h2 mb-0'>
              <p className='ms-5 text-white fw-bold'>Fun Activities Nearby</p>
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
  const { activityName, images, ages2_5: ages2to5, ages5_12: ages5to12 } = props.activity;

  let age2to5check;
  let age5to12check;
  if (ages2to5) {
    age2to5check = 'fa-solid fa-square-check d-inline-block';
  } else {
    age2to5check = 'fa-solid fa-square d-inline-block';
  }

  if (ages5to12) {
    age5to12check = 'fa-solid fa-square-check d-inline-block';
  } else {
    age5to12check = 'fa-solid fa-square d-inline-block';
  }

  return (
    // this should be an anchor tag because it shows another view
    <div className='container bg-white border-radius-20px mb-4 py-4'>
      <div className='ps-5'>
        <div className='text-brown fs-5 fw-bold'>{activityName}</div>
        <p className='text-gray fs-6 fw-bold'>1.1 miles</p>
      </div>
      <div className='d-flex justify-content-sm-center justify-content-lg-between'>
          <Carousel images={images}/>
          {/* check box if age true, else empty check box */}
          <div className='age-range-container fs-5 fw-bold p-5 w-50'>
            <p className='text-brown'>Age Range</p>
            <div className="age-range-line">
              <i className={age2to5check}></i>
              <p className='d-inline-block text-black ms-4'>2-5 years</p>
            </div>
            <div className="age-range-line">
              <i className={age5to12check}></i>
              <p className='d-inline-block text-black ms-4'>5-12 years</p>
            </div>
          </div>
        </div>

    </div>
  );
}
