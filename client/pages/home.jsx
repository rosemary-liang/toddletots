import React from 'react';
import SearchBar from '../components/searchbar';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      openActivityId: null

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

    </>
    );
  }
}

function Activity(props) {
  // const { activityId, activityName, description, ages2_5, ages5_12, streetAddress, city, zipCode, lat, lng, images } = props.activity;
  const { activityName, images } = props.activity;

  return (
    // this should be an anchor tag because it shows another view
    <div className='container bg-white p-4 mb-4 border-radius-20px'>
      <div className='text-brown fw-bold'>{activityName}</div>
      <p className='text-gray fw-bold'>1.1 miles</p>
      <Carousel images={images}/>

    </div>
  );
}

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImageId: 'smallest integer for each activityId'

    };

  }

  // console.log('images:', images);

  // method to handleNext and handlePrevious

  render() {
    const { images } = this.props;
    const { activityId } = images;

    return (

    // first image active, remaining are not active (use state to control)
    // state --> carouselClass: 'carousel-item' or 'carousel-item active'

      <div id={activityId} className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {
          images.map(image => (
            <div key={image.imageId} className="carousel-item active carousel-list-view">
              <img src={image.url} className="d-block w-100" alt={image.caption} />
            </div>

          ))}
      </div>
      {/* button on click makes next or previous thing active */}
      <button className="carousel-control-prev" type="button" data-bs-target={activityId} data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
      <button className="carousel-control-next" type="button" data-bs-target={activityId} data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  }
}
