import React from 'react';
import axios from 'axios';
import Carousel from '../components/carousel';
import AgeRange from '../components/age-range';

export default class ActivityDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
      editClicked: false,
      editSuccess: false
    };

    this.setParentStateActivity = this.setParentStateActivity.bind(this);
    this.setParentStateEditClicked = this.setParentStateEditClicked.bind(this);
    this.setParentStateEditSuccess = this.setParentStateEditSuccess.bind(this);
  }

  componentDidMount() {
    fetch(`api/activities/${this.props.activityId}`)
      .then(results => results.json())
      .then(activity => this.setState({ activity }));
  }

  setParentStateActivity(newActivity) {
    this.setState({ activity: newActivity });
  }

  setParentStateEditClicked(newStatus) {
    this.setState({ editClicked: newStatus });
  }

  setParentStateEditSuccess(newStatus) {
    this.setState({ editSuccess: newStatus });
  }

  render() {
    // console.log('ActivityDetail this.state:', this.state);
    const { activity, editClicked } = this.state;
    if (!activity) {
      return null;
    }

    if (!editClicked) {
      return (
      <>
      <ActivityDetail
      activity={this.state.activity}
      setParentStateEditClicked= {this.setParentStateEditClicked}/>
      </>
      );
    }

    if (editClicked) {
      return (
        <>
        <EditActivity
        activity={this.state.activity}
        setParentStateActivity={this.setParentStateActivity}
        setParentStateEditClicked={this.setParentStateEditClicked} />
        </>
      );
    }

    // if edit entry clicked = true & success = true, then show success page

  }
}

class ActivityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setParentStateEditClicked(true);
  }

  render() {
    const { activityName, streetAddress, city, zipCode, description, images, ages2to5, ages5to12 } = this.props.activity;
    // console.log('props.activity:', this.props.activity);
    // return (<h1>Hi</h1>);

    return (
  <>
    <div className="container bg-secondary pt-2  pb-3 px-3 rounded">
      <div className='d-flex justify-content-between align-items-center'>
        <a href='#' className='bg-transparent border-0 h1 text-white fw-bold'><i className="fa-solid fa-arrow-left"></i></a>
        <p className='h2 text-white fw-bold'>View Activity</p>
        <p></p>
      </div>

      <div className="container bg-white p-4 p-md-5 rounded d-flex flex-column ">
        <div className='d-flex justify-content-between'>
          <p className='h4 text-brown fw-bold'>{activityName}</p>
          <div className='d-flex justify-content-end h4 text-gray'>
            <button className='bg-transparent border-0 text-gray fw-bold mx-3'><i className="fa-solid fa-bookmark"></i></button>

              <button onClick={this.handleClick} className='bg-transparent border-0 text-gray fw-bold '><i className="fa-solid fa-pencil"></i></button>

          </div>
        </div>

        <div className="address">
          <p className='m-0'>{streetAddress}</p>
          <p className='m-0'>{city}, {zipCode}</p>
        </div>
        <div>
          <button className='rounded bg-primary border-0 text-white fw-bold mt-4 mb-5 py-1 px-3'>get directions</button>
        </div>
        <div className='d-lg-flex flex-lg-row-reverse justify-content-md-end position-relative'>
          <div className=' carousel-overlap w-100 d-flex justify-content-center align-content-start'>
            <Carousel images={images} />
          </div>
          <div className='w-75 mt-md-5'>
            <AgeRange ages2to5={ages2to5} ages5to12={ages5to12} page='#activities' />
          </div>
        </div>

        <div className='mt-2 mt-lg-5'>
          <p className='text-brown fw-bold h5'>Description</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  </>
    );
  }
}

class EditActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      activityId: null,
      activityName: null,
      streetAddress: null,
      city: null,
      zipCode: null,
      currentCoordinates: null,
      description: null,
      ages2to5: null,
      ages5to12: null,
      images: [],
      modifiedImage: null,
      url: null,
      caption: null,
      imageId: null,
      // images should be mapped to render
      errorMsg: '',
      activityEdited: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { activityId, activityName, streetAddress, city, zipCode, description, ages2to5, ages5to12, images } = this.props.activity;

    const { imageId, url, caption } = images[0];

    this.setState({ activityId, activityName, streetAddress, city, zipCode, description, ages2to5, ages5to12, images, url, caption, imageId });

  }

  handleInputChange(event) {
    const { value, name, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: newValue });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { streetAddress, city, zipCode, currentCoordinates, modifiedImage } = this.state;

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

    if (modifiedImage == null) {
      const { url, caption, imageId } = this.state;
      this.setState({ modifiedImage: { url, caption, imageId } }, () => {
        const images = [...this.state.images];
        let imageToModify = { ...images[0] };
        imageToModify = this.state.modifiedImage;
        images[0] = imageToModify;
        this.setState({ images }, () => this.handleSubmit(event));
      });
    }

    if (currentCoordinates && modifiedImage) {
      const req = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      };

      fetch('/api/activities', req)
        .then(res => res.json())
        .then(activity => {
          if (activity) {

            this.setState({ activityAdded: activity });
          }
        });
    }

  }

  render() {
    // console.log(this.props);
    // console.log('NewEntryForm this.state:', this.state);
    // console.log('this.state:', this.state);
    const { handleInputChange, handleSubmit } = this;
    const { errorMsg, activityName, streetAddress, city, zipCode, description, ages2to5, ages5to12, url, caption } = this.state;

    return (
        <div className='text-decoration-none pb-5 bg-secondary rounded'>
          <div className="d-flex flex-column align-items-center ">
            <div className="mt-2 w-100 px-4 d-flex flex-column justify-content-center">
              <div className='d-flex justify-content-center fs-2 mb-0 position-relative'>
                <a href='#new-entry-map' className='bg-transparent border-0 h1 text-white fw-bold position-absolute top-0 start-0'><i className="fa-solid fa-arrow-left"></i></a>
                <p className='ms-5 text-white fw-bold'>Edit Activity</p>
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
                        value={activityName}
                        className='border-0 border-gray border-radius-10px entry-form-single fw-bold my-2'/>
                      <input
                        required
                        type="text"
                        name="streetAddress"
                        placeholder="street address"
                        onChange={handleInputChange}
                        value={streetAddress}
                        className='border-0 border-gray border-radius-10px entry-form-single fw-bold my-2' />
                      <div className='d-flex my-2 justify-content-between'>
                        <input
                          required
                          type="text"
                          name="city"
                          placeholder="city"
                          onChange={handleInputChange}
                          value={city}
                          className='col-md-8 border-0 border-gray border-radius-10px entry-form-single fw-bold' />
                        <input
                          required
                          type="text"
                          name="zipCode"
                          placeholder="zip"
                          onChange={handleInputChange}
                          value={zipCode}
                          className='col-md-4 col-lg-4 border-0 border-gray border-radius-10px entry-form-single fw-bold ms-1' />
                      </div>
                      <textarea
                        required
                        name="description"
                        placeholder="description"
                        rows="10"
                        onChange={handleInputChange}
                        value={description}
                        className='new-entry-description col-md-12 border-radius-10px mb-3 border-0 ps-2 fw-bold my-2 ' >
                      </textarea>

                      <div className='bg-white p-4 fw-bold text-primary border-radius-10px fs-5 mb-2 '>
                        <p className=' '>Age Range</p>
                        <div className="form-check  mb-4">
                          <input
                            type="checkbox"
                            value={ages2to5}
                            name="ages2to5"
                            onChange={handleInputChange}
                            className="form-check-input" />
                          <label className="" htmlFor="flexCheckDefault">Ages 2-5</label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            value={ages5to12}
                            name="ages5to12"
                            onChange={handleInputChange}
                            className="form-check-input" />
                          <label className="" htmlFor="flexCheckDefault">Ages 5-12</label>
                        </div>
                      </div>
                    </div>

                    <div className='image-container add-images-container col-lg-6 ms-lg-4 px-lg-2'>

                      <input
                        required
                        type="text"
                        name="url"
                        placeholder='image url'
                        onChange={handleInputChange}
                        value={url}
                        className='w-100 border-0 border-radius-10px entry-form-single fw-bold my-2' />
                      <input
                        required
                        type="text"
                        name="caption"
                        placeholder='caption'
                        onChange={handleInputChange}
                        value={caption}
                        className='w-100 border-0 border-radius-10px entry-form-single fw-bold my-2' />
                      <div>
                        <img onChange={handleInputChange} src={url} alt={caption} className='new-entry w-100 mt-2 border-radius-10px' />
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
