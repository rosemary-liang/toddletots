import React from 'react';
import axios from 'axios';
import { AppContext } from '../lib';
import AgeRange from '../components/age-range';

export default class NewEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: null,
      streetAddress: '',
      city: '',
      zipCode: '',
      currentCoordinates: null,
      description: null,
      ages2to5: false,
      ages5to12: false,
      url: null,
      caption: null,
      errorMsg: '',
      activityAdded: [],
      activityAddedSuccess: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkCurrentCoordinates = this.checkCurrentCoordinates.bind(this);
  }

  componentDidUpdate() {
    if (this.state.streetAddress === '' && this.context.newActivityPin !== []) {
      const { streetAddress, city, zipCode } = this.context.newActivityPin;
      if (streetAddress && city && zipCode) {
        this.setState({
          streetAddress,
          city,
          zipCode
        });
      }
    }
  }

  handleInputChange(event) {
    const { value, name, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: newValue });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ currentCoordinates: this.context.newActivityPin.currentCoordinates }, () => {
      this.checkCurrentCoordinates();
    });

  }

  checkCurrentCoordinates() {
    const { streetAddress, city, zipCode, currentCoordinates } = this.state;
    if (!currentCoordinates) {
      const modifiedStreetAddress = streetAddress.replaceAll(' ', '+');
      const address = `${modifiedStreetAddress},+${city},+${zipCode}`;
      axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_KEY}`)
        .then(data => {
          const currentCoordinates = data.data.results[0].geometry.location;
          this.setState({
            currentCoordinates,
            errorMsg: ''
          }, () => {
            this.checkCurrentCoordinates();
          });
        })
        .catch(err => {
          console.error(err);
          this.setState({ errorMsg: 'Error - invalid address provided' });
        });
    }

    if (currentCoordinates) {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      };

      fetch('/api/activities', req)
        .then(res => res.json())
        .then(activity => {
          if (activity) {
            this.setState({
              activityAdded: activity,
              activityAddedSuccess: true
            });
            this.context.setNewActivityPin([]);
            this.context.refreshActivities();
          }
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    // console.log('NewEntryForm this.state:', this.state);
    const { handleInputChange, handleSubmit } = this;
    const { errorMsg, activityAddedSuccess } = this.state;
    let url = 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg';
    let caption = 'placeholder image';
    if (this.state.url && this.state.caption) {
      url = this.state.url;
      caption = this.state.caption;
    }

    if (!activityAddedSuccess) {
      return (
      <div className='text-decoration-none pb-5 bg-secondary rounded'>
        <div className="d-flex flex-column align-items-center ">
          <div className="mt-2 w-100 px-4 d-flex flex-column justify-content-center">
            <div className='d-flex justify-content-center fs-2 mb-0 position-relative'>
                <a href='#new-entry-map' className='bg-transparent border-0 h1 text-white fw-bold position-absolute top-0 start-0'><i className="fa-solid fa-arrow-left"></i></a>
              <p className='ms-5 text-white fw-bold'>Add New Activity</p>
            </div>
            <div className='w-100 p-1 p-2 '>
              <form onSubmit={handleSubmit} action="" >
                <div className='d-flex flex-column flex-lg-row justify-content-lg-between p-2'>
                  <div className='d-flex flex-column col-md-12 col-lg-6'>

                    <input
                      required
                      type="text"
                      name="activityName"
                      placeholder='activity name'
                      onChange={handleInputChange}
                      className='border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />
                    <input
                      required
                      type="text"
                      name="streetAddress"
                      placeholder="street address"
                      value={this.state.streetAddress}
                      onChange={handleInputChange}
                        className='border-0 border-gray border-radius-10px entry-form-single fw-bold my-2'/>
                    <div className='d-flex my-2 justify-content-between'>
                        <input
                          required
                          type="text"
                          name="city"
                          placeholder="city"
                          value={this.state.city}
                          onChange={handleInputChange}
                            className='col-8 border-0 border-gray border-radius-10px entry-form-single fw-bold' />
                      <input
                        required
                        type="text"
                        name="zipCode"
                        placeholder="zip"
                        value={this.state.zipCode}
                        onChange={handleInputChange}
                            className='col-4 border-0 border-gray border-radius-10px entry-form-single fw-bold ms-1' />
                    </div>
                    <textarea
                      required
                      name="description"
                      placeholder="description"
                      rows="10"
                      onChange={handleInputChange}
                        className='new-entry-description col-md-12 border-radius-10px mb-3 border-0 ps-2 fw-bold my-2 ' >
                      </textarea>

                      <div className='bg-white p-4 fw-bold text-primary border-radius-10px fs-5 mb-2 '>
                        <p className=' '>Age Range</p>
                        <div className="form-check  mb-4">
                          <input
                            type="checkbox"
                            value=""
                            name="ages2to5"
                            onChange={handleInputChange}
                            className="form-check-input" />
                          <label className="" htmlFor="flexCheckDefault">Ages 2-5</label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            value=""
                            name="ages5to12"
                            onChange={handleInputChange}
                            className="form-check-input" />
                          <label className="" htmlFor="flexCheckDefault">Ages 5-12</label>
                        </div>
                      </div>
                  </div>

                <div className='add-images-container col-lg-6 ms-lg-4 px-lg-2'>
                    <input
                      required
                      type="text"
                      name="url"
                      placeholder='image url'
                      onChange={handleInputChange}
                      className='w-100 border-0 border-radius-10px entry-form-single fw-bold my-2' />
                    <input
                      required
                      type="text"
                      name="caption"
                      placeholder='caption'
                      onChange={handleInputChange}
                      className='w-100 border-0 border-radius-10px entry-form-single fw-bold my-2' />
                    <div>
                      <img onChange={handleInputChange} src={url} alt={caption} className='new-entry w-100 mt-2 border-radius-10px'/>
                    </div>
                  </div>
              </div>
              <div className='d-flex justify-content-end mt-3'>
                <input
                  type='submit' value='submit'
                  className='px-5 py-1 bg-white border-radius-10px text-primary border-0 fw-bold shadow-sm' />
              </div>
              <div className=' bg-danger mt-4 text-center text-white fw-bold fs-5'>{errorMsg}</div>
            </form>

            </div>
          </div>
        </div>
      </div>
      );
    } else {
      const { activityName, streetAddress, city, zipCode, ages2to5, ages5to12, description, images } = this.state.activityAdded;
      const { url, caption } = images;
      return (
        <div className='text-decoration-none pb-5 bg-secondary rounded'>
          <div className="d-flex flex-column align-items-center ">
            <div className="mt-2 w-100 ps-4 d-flex flex-column justify-content-center">
              <div className='d-flex justify-content-center fs-2 mb-0 position-relative'>
                <p className='text-white fw-bold'>Success!</p>
              </div>
              <div className='col-12 p-2 bg-white row border-radius-10px mb-4 fs-5 position-relative'>
                <div className='d-flex justify-content-between align-content-center align-items-center'>
                  <p className='text-brown fw-bold pt-2'>{activityName}</p>
                </div>
                <p className='my-0 fs-6'>{streetAddress}</p>
                <p className='mt-0 fs-6'>{city}, {zipCode}</p>
                <div className='col-md-12 col-lg-6 mb-4 p-md-2 mt-2 border-radius-10px'>
                  <img src={url} alt={caption} className='new-entry-success mt-2 border-radius-10px' />
                </div>
                  <AgeRange ages2to5={ages2to5} ages5to12={ages5to12} page='#new-entry-success' />
                <div className='mt-lg-5'>
                  <p className='fw-bold text-brown'>Description</p>
                  <p className='fs-6'> {description}</p>
                </div>
              </div>
              <div className='my-2 d-flex justify-content-end me-2'>
                <a href="#" className='text-decoration-none'>
                  <button
                   className='px-2 py-1 bg-white border-radius-10px text-primary border-0 fw-bold shadow-sm'>see all activities</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

  }
}

NewEntryForm.contextType = AppContext;
