import React from 'react';
import Carousel from '../components/carousel';
import AgeRange from '../components/age-range';

export default class ActivityDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null
    };
  }

  componentDidMount() {
    fetch(`api/activities/${this.props.activityId}`)
      .then(results => results.json())
      .then(activity => this.setState({ activity }));
  }

  render() {
    // console.log('ActivityDetail this.state:', this.state);

    if (!this.state.activity) {
      return null;
    }

    const { activityName, streetAddress, city, zipCode, description, images, ages2_5: ages2to5, ages5_12: ages5to12 } = this.state.activity;

    return (
      <>
      <div className="container bg-secondary pt-2 pb-4 px-3 rounded">
        <div className='d-flex justify-content-between align-items-center'>
          <button className='bg-transparent border-0 h1 text-white fw-bold'><i className="fa-solid fa-arrow-left"></i></button>
          <p className='h2 text-white fw-bold'>View Activity</p>
          <p></p>
        </div>

        <div className="container bg-white p-4 p-md-5 rounded d-flex flex-column ">
          <div className='d-flex justify-content-between'>
              <p className='h4 text-brown fw-bold'>{activityName}</p>
              <div className='d-flex justify-content-end h4 text-gray'>
                <button className='bg-transparent border-0 text-gray fw-bold mx-3'><i className="fa-solid fa-bookmark"></i></button>
                <button className='bg-transparent border-0 text-gray fw-bold '><i className="fa-solid fa-pencil"></i></button>
              </div>
          </div>

          <div className="address">
            <p className='m-0'>{streetAddress}</p>
            <p className='m-0'>{city}, {zipCode}</p>
          </div>
          <div>
           <button className='rounded bg-primary border-0 text-white fw-bold mt-4 mb-5 py-1 px-3'>get directions</button>
            </div>
          <div className='d-md-flex flex-md-row-reverse justify-content-md-end position-relative'>
            <div className=' carousel-overlap w-100 d-flex justify-content-center align-content-start'>
              <Carousel images={images} />
            </div>
            <div className='w-75'>
              <AgeRange ages2to5={ages2to5} ages5to12={ages5to12} page='#activities'/>
            </div>
          </div>

          <div className='my-2 my-md-5'>
            <p className='text-brown fw-bold h5'>Description</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
      </>
    );

  }
}
