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
      url: null,
      caption: null,
      errorMsg: ''

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleImageInputChange = this.handleImageInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { value, name, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: newValue });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userId, streetAddress, city, zipCode, currentCoordinates } = this.state;
    if (userId === null) {
      this.setState({ userId: 1 }, () => { this.handleSubmit(event); });
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
    // // do PUT request
  }

  render() {
    // console.log('New Entry Form this.state:', this.state);
    const { handleInputChange, handleSubmit } = this;
    const { errorMsg } = this.state;
    let url = 'https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg';
    let caption = 'placeholder image';
    if (this.state.url && this.state.caption) {
      url = this.state.url;
      caption = this.state.caption;
    }

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

                <div className='add-images-container'>
                  {/* <div className='single-add-image-container'>
                    <div className='bg-white p-4 border-radius-10px bg-white border-0 w-100 '>
                      <div className='d-flex align-items-center align-content-center'>
                        <div className="d-flex h-24px">
                          <button className='bg-transparent border-0'>
                            <i className="fa-solid fa-plus py-1 text-white bg-secondary"></i>
                          </button>
                          <p className='ms-5 fw-bold text-brown'>Add an image</p>
                        </div>
                      </div> */}

                  <div className='add-image-expanded mt-2'>
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

                <div className='d-flex justify-content-end mt-5'>
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
  }
}
