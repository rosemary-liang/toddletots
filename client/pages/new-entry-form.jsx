import React from 'react';
import axios from 'axios';
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
      images: [],
      errorMsg: ''

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { value, name, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: newValue });
  }

  handleSubmit(event) {
    // check that no properties in state are null
    // check that image array is not empty (length greater than 0)
    event.preventDefault();
    const { userId, streetAddress, city, zipCode, currentCoordinates } = this.state;
    if (userId === null) {
      this.setState({ userId: 1 }, () => { this.handleSubmit(); });
    }
    if (currentCoordinates === null) {
      const modifiedStreetAddress = streetAddress.replaceAll(' ', '+');
      const address = `${modifiedStreetAddress},+${city},+${zipCode}`;
      axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_KEY}`)
        .then(data => {
          const currentCoordinates = data.data.results[0].geometry.location;
          this.setState({
            currentCoordinates,
            errorMsg: ''
          });
        })
        .catch(err => {
          console.error(err);
          this.setState({ errorMsg: 'Error - invalid address provided' });
        });
    }

    // if (userId && currentCoordinates) {
    //   const req = {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(this.state)
    //   };
    //   fetch('/api/activities')
    //     .then(res => res.json());
    // }
    // do PUT request
  }

  render() {
    // console.log('New Entry Form this.state:', this.state);
    // const { streetAddress, city, zipCode, currentCoordinates } = this.state;
    const { handleInputChange, handleSubmit } = this;
    const { errorMsg } = this.state;
    return (
      <div className='text-decoration-none pb-5 bg-secondary rounded'>
        <div className="d-flex flex-column align-items-center ">
          <div className="mt-2 w-100 px-4 d-flex flex-column justify-content-center">
            <div className='d-flex justify-content-center fs-2 mb-0 position-relative'>
              <a href='#' className='bg-transparent border-0 h1 text-white fw-bold position-absolute top-0 start-0'><i className="fa-solid fa-arrow-left"></i></a>
              <p className='ms-5 text-white fw-bold'>Add New Activity</p>
            </div>
            <div className='w-100 p-1 p-2'>
              <form onSubmit={handleSubmit} action="">
                <input
                  required
                  type="text"
                  name="activityName"
                  placeholder='activity name'
                  onChange={handleInputChange}
                  className='w-100 border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />
                <input
                  required
                  type="text"
                  name="streetAddress"
                  placeholder="street address"
                  onChange={handleInputChange}
                  className='w-100 border-0 border-gray border-radius-10px entry-form-single fw-bold my-2'/>
                <div className='d-flex my-2'>
                  <div className='w-75 me-2'>
                    <input
                      required
                      type="text"
                      name="city"
                      placeholder="city"
                      onChange={handleInputChange}
                      className='w-100 border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />
                  </div>
                  <div className='me-2'>
                  <input
                    required
                    type="text"
                    name="zipCode"
                    placeholder="zip"
                    onChange={handleInputChange}
                    className='w-100 border-0 border-gray border-radius-10px entry-form-single fw-bold my-2 ms-1' />
                  </div>
                </div>

                <textarea
                  required
                  name="description"
                  placeholder="description"
                  rows="10"
                  onChange={handleInputChange}
                  className='w-100 border-radius-10px mb-3 border-0 ps-2 fw-bold' ></textarea>

                <div className='bg-white p-4 fw-bold text-primary border-radius-10px fs-5 mb-4'>
                  <p className=' '>Age Range</p>
                  <div className="form-check  mb-4">
                    <input
                      type="checkbox"
                      value=""
                      name="ages2to5"
                      onChange={handleInputChange}
                      className="form-check-input" />
                      <label className=""htmlFor="flexCheckDefault">Ages 2-5</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      value=""
                      name="ages5to12"
                      onChange={handleInputChange}
                      className="form-check-input"/>
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
                <div className='d-flex justify-content-between mt-5'>
                  <a href="#new-entry-edit-images">
                    <input
                    type='button' value='edit images'
                    className='px-4 py-1 bg-white border-radius-10px text-primary border-0 fw-bold shadow-sm' />
                    </a>
                  <input
                    type='submit' value='submit'
                    className='px-5 py-1 bg-white border-radius-10px text-primary border-0 fw-bold shadow-sm'/>
                </div>

              </form>
              <div className=' bg-danger mt-4 text-center text-white fw-bold fs-5'>{errorMsg}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
