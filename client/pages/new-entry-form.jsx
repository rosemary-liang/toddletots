import React from 'react';
// import axios from 'axios';
// import SearchBar from '../components/searchbar';
// import ReactTooltip from 'react-tooltip';

export default class NewEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      activityName: null,
      streetAddress: null,
      city: null,
      zipCode: null,
      currentCoordinates: null,
      description: null,
      ages2to5: null,
      ages5to12: null,
      defaultDescription: true,
      images: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className='text-decoration-none pb-5 bg-secondary rounded'>
        <div className="d-flex flex-column align-items-center ">
          <div className="mt-2 w-100 px-4 d-flex flex-column justify-content-center">
            <div className='d-flex justify-content-center fs-2 mb-0 position-relative'>
              <a href='#' className='bg-transparent border-0 h1 text-white fw-bold position-absolute top-0 start-0'><i className="fa-solid fa-arrow-left"></i></a>
              <p className='ms-5 text-white fw-bold'>Add New Activity</p>
            </div>
            <div className='w-100 p-1 p-2'>
              <form action="">
                <input type="text" name="activityName" placeholder='activity name' onChange={this.handleInputChange} className='w-100 border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />
                <input type="text" name="streetAddress" placeholder="street address" className='w-100 border-0 border-gray border-radius-10px entry-form-single fw-bold my-2'/>
                <div className='d-flex my-2'>
                  <div className='w-75 me-2'>
                    <input type="text" name="city" placeholder="city" className='w-100 border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />
                  </div>
                  <div className='me-2'>
                  <input type="text" name="zipCode" placeholder="zip" className='w-100 border-0 border-gray border-radius-10px entry-form-single fw-bold my-2 ms-1' />
                  </div>
                </div>
                <textarea name="description" rows="10" className='w-100 border-radius-10px mb-3 border-0' ></textarea>
                <div className='bg-white p-4 fw-bold text-primary border-radius-10px fs-5 mb-4'>
                  <p className=' '>Age Range</p>
                  <div className="form-check  mb-4">
                    <input className="form-check-input" type="checkbox" value="" name="ages2to5"></input>
                      <label className="" htmlFor="flexCheckDefault">Ages 2-5</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" name="ages5to12"></input>
                    <label className="" htmlFor="flexCheckDefault">Ages 5-12</label>
                  </div>

                </div>
                <div className='fs-6 text-brown fw-bold'>
                  <p>No images uploaded yet</p>
                  <div>
                    <p>images uploaded:</p>
                    {/* map images to preview layout and size */}
                  </div>
                </div>

              </form>
            </div>

            <div className='d-flex justify-content-center my-4'>
              <a href="#new-entry-form"><button className='px-5 py-1 bg-white border-radius-10px text-primary border-0 fw-bold shadow-sm' data-to='form'>Submit</button>
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

// function HandleZip(zipCoordinates) {
//   this.setState({ currentCoordinates: zipCoordinates });
// }

// function UseCurrentLocation() {
//   axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GOOGLE_MAPS_KEY}`)
//     .then(data => {
//       const currentCoordinates = data.data.location;
//       this.setState({ currentCoordinates }, function () {
//         this.sortActivitiesByDistance(currentCoordinates);
//       });
//     })
//     .catch(err => console.error(err));
// }
