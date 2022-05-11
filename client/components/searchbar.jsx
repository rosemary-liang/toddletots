import React from 'react';
import axios from 'axios';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      zipCoordinates: [],
      city: '',
      errorMessage: ''

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let errorMessage;
    const { value } = this.state;
    if (value.length === 5 && typeof parseInt(value) === 'number') {

      this.getZipCoordinates(value)
        .then(data => {
          const zipCoordinates = data.data.results[0].geometry.location;
          const city = data.data.results[0].address_components[1].long_name;
          this.setState({ zipCoordinates, city }, function () {
            this.props.handleZip(zipCoordinates);
          });
          errorMessage = '';
          this.setState({ errorMessage });
        })
        .catch(err => {
          console.error(err);
          errorMessage = 'Zip code does not exist';
          this.setState({ errorMessage });
        });

    } else {
      if (value.length !== 5) {
        errorMessage = 'Zipcode must have 5 characters';
      } else if (typeof parseInt(value) !== 'number') {
        errorMessage = 'Zipcode must only have numerical characters';
      }
      this.setState({ errorMessage });
    }
    event.target.value = '';
  }

  getZipCoordinates(zip) {
    return axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${process.env.GOOGLE_MAPS_KEY}`);
  }

  render() {
    return (
    <>
      <div>
        <div className="form-container searchbar d-flex justify-content-center px-2">
          <form className='d-flex justify-content-center align-items-center position-relative w-100 h-40px'>
            <input type="number" value={this.state.value} onChange={this.handleChange} maxLength='6' minLength='6' name="search" placeholder='search by zip ' className='border-radius-90px text-center bg-white w-100 h-100 px-2 border-0 fs-5 fw-bold'/>
            <button type="submit" onClick={this.handleSubmit} className='bg-transparent border-1 border-radius-90px px-3 me-0 h4 position-absolute h-40px button-search'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <div className=''>
          <p className='searchbar-error-msg text-danger fw-bold px-2 text-center'>{this.state.errorMessage}</p>
            <p className='fw-bold px-2 text-center'>{this.state.city}</p>
        </div>
      </div>
    </>
    );
  }
}
