import React from 'react';
import axios from 'axios';
// import SearchBar from '../components/searchbar';
// import ReactTooltip from 'react-tooltip';

export default class NewEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      // activityName: null,
      // streetAddress: null,
      // city: null,
      // zipCode: null,
      // currentCoordinates: null,
      // description: null,
      // ages2to5: null,
      // ages5to12: null,
      // url: null,
      // caption: null,
      // errorMsg: ''

      activityName: 'Sweet Shade Neighborhood Park',
      streetAddress: '15 Sweet Shade',
      city: 'Irvine',
      zipCode: 92606,
      currentCoordinates: null,
      description: 'Wow what a nice park. All the nice things.',
      ages2to5: true,
      ages5to12: true,
      url: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
      caption: 'dog',
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
    event.preventDefault();
    const { streetAddress, city, zipCode, currentCoordinates } = this.state;
    // if (userId === null) {
    //   this.setState({ userId: 1 }, () => { this.handleSubmit(event); });
    // }
    if (currentCoordinates === null) {
      const modifiedStreetAddress = streetAddress.replaceAll(' ', '+');
      const address = `${modifiedStreetAddress},+${city},+${zipCode}`;
      axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_KEY}`)
        .then(data => {
          const currentCoordinates = data.data.results[0].geometry.location;
          this.setState({
            currentCoordinates,
            errorMsg: ''
          }, () => {
            this.handleSubmit(event);
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
      // console.log('req.body:', req.body);
      fetch('/api/activities', req)
        .then(res => res.json())
        .then(activity => {
          if (activity) {
            // go to success page and populate it
            // console.log(activity);
            return activity;
          }
        });

    }
    // // do PUT request
  }

  render() {
    // console.log('NewEntryForm this.state:', this.state);
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
            <div className='w-100 p-1 p-2 '>
              <form onSubmit={handleSubmit} action="" >
                <div className='d-flex flex-column flex-lg-row justify-content-lg-between p-2'>
                  <div className='d-flex flex-column col-md-12 col-lg-6'>

                    <input
                      // required
                      type="text"
                      name="activityName"
                      placeholder='activity name'
                      onChange={handleInputChange}
                      className='border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />
                    <input
                      // required
                      type="text"
                      name="streetAddress"
                      placeholder="street address"
                      onChange={handleInputChange}
                        className='border-0 border-gray border-radius-10px entry-form-single fw-bold my-2'/>
                    <div className='d-flex my-2 justify-content-between'>
                        <input
                          // required
                          type="text"
                          name="city"
                          placeholder="city"
                          onChange={handleInputChange}
                            className='col-md-8 border-0 border-gray border-radius-10px entry-form-single fw-bold' />
                      <input
                        // required
                        type="text"
                        name="zipCode"
                        placeholder="zip"
                        onChange={handleInputChange}
                            className='col-md-4 col-lg-4 border-0 border-gray border-radius-10px entry-form-single fw-bold ms-1' />
                    </div>
                    <textarea
                      // required
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
                      // required
                      type="text"
                      name="url"
                      placeholder='image url'
                      onChange={handleInputChange}
                      className='w-100 border-0 border-radius-10px entry-form-single fw-bold my-2' />
                    <input
                      // required
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
  }
}
