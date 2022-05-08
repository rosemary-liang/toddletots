import React from 'react';
import AppContext from '../lib/app-context';
import axios from 'axios';
import Carousel from '../components/carousel';
import AgeRange from '../components/age-range';
import DeleteModal from '../components/delete-modal';

export default class ActivityDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null,
      editClicked: false
    };

    this.setEditClicked = this.setEditClicked.bind(this);
  }

  componentDidMount() {
    this.fetchActivities();
  }

  fetchActivities() {
    fetch(`api/activities/${this.props.activityId}`)
      .then(results => results.json())
      .then(activity => this.setState({ activity }));
  }

  setEditClicked(newStatus) {
    this.setState({ editClicked: newStatus }, () => {
      if (!this.state.editClicked) {
        this.fetchActivities();
      }
    });
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
      setEditClicked= {this.setEditClicked}/>
      </>
      );
    }

    if (editClicked) {
      return (
        <>
        <EditActivity
        activity={this.state.activity}
        setEditClicked={this.setEditClicked} />
        </>
      );
    }
  }
}

class ActivityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmark: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDirections = this.handleDirections.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
  }

  componentDidMount() {
    const { activityId } = this.props.activity;
    const userId = this.context.userId;
    if (!isNaN(userId)) {
      fetch(`/api/bookmarks/${userId}/${activityId}`)
        .then(result => result.json())
        .then(data => {
          const bookmark = data.length !== 0;
          this.setState({ bookmark });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  handleClick() {
    this.props.setEditClicked(true);
  }

  handleDirections() {
    const { lat, lng } = this.props.activity;
    // make below active after testing
    // const { currentCoordinates } = this.context;
    // window.open(`https://www.google.com/maps/dir/?api=1&origin=${currentCoordinates.lat},${currentCoordinates.lng}&destination=${lat},${lng}`);

    // make below inactive after testing
    const center = { lat: 33.6846, lng: -117.8265 };
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${center.lat},${center.lng}&destination=${lat},${lng}`);
  }

  handleBookmark() {
    // have this return true or false?
    this.checkLoggedIn();

    const { bookmark } = this.state;
    const userId = this.context.userId;
    const { activityId } = this.props.activity;
    const method = bookmark ? 'DELETE' : 'POST';

    fetch(`/api/bookmarks/${userId}/${activityId}`, {
      method: method
    })
      .then(result => {
        result.json();
        const newStatus = !bookmark;
        this.setState({ bookmark: newStatus });
      })
      .catch(err => {
        console.error(err);
      });
  }

  checkLoggedIn() {
    const userId = this.context.userId;
    if (!isNaN(userId)) {
      // show error tooltip or modal and do nothing?;
      // return

    }
  }

  render() {
    // console.log('ActivityDetail this.state:', this.state);

    const { activityName, streetAddress, city, zipCode, description, images, ages2to5, ages5to12 } = this.props.activity;

    const { bookmark } = this.state;
    const bookmarkColorClass = bookmark
      ? 'fa-solid fa-bookmark text-primary'
      : 'fa-solid fa-bookmark text-gray';
    // add if statement to control bookmark color
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
            <button onClick={this.handleBookmark} className='bg-transparent border-0 text-gray fw-bold mx-3'>
              <i className={bookmarkColorClass}></i></button>

              <button onClick={this.handleClick} className='bg-transparent border-0 text-gray fw-bold '><i className="fa-solid fa-pencil"></i></button>

          </div>
        </div>

        <div className="address">
          <p className='m-0'>{streetAddress}</p>
          <p className='m-0'>{city}, {zipCode}</p>
        </div>
        <div>
          <button
          onClick={this.handleDirections}
          className='rounded bg-primary border-0 text-white fw-bold mt-4 mb-5 py-1 px-3'>get directions</button>
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
      errorMsg: '',
      activityEdited: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { activityId, activityName, streetAddress, city, zipCode, description, ages2to5, ages5to12, images, userId } = this.props.activity;

    const { imageId, url, caption } = images[0];

    this.setState({ activityId, activityName, streetAddress, city, zipCode, description, ages2to5, ages5to12, images, url, caption, imageId, userId });
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

      const { activityId } = this.state;

      fetch(`/api/activities/${activityId}`, req)
        .then(res => res.json())
        .then(activity => {
          if (activity) {
            this.props.setEditClicked(false);
          }
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    // console.log('this.props:', this.props);
    // console.log('this.state:', this.state);
    const { handleInputChange, handleSubmit } = this;
    const { activityId, errorMsg, activityName, streetAddress, city, zipCode, description, ages2to5, ages5to12, url, caption } = this.state;

    if (!activityName || !url || !caption) {
      return null;
    } else {

      return (
        <div className='text-decoration-none pb-5 bg-secondary rounded'>
          <div className="d-flex flex-column align-items-center ">
            <div className="mt-2 w-100 px-4 d-flex flex-column justify-content-center">
              <div className='d-flex justify-content-between fs-2 mb-0'>
                <button onClick={() => this.props.setEditClicked(false)} className='bg-transparent border-0 h1 text-white fw-bold '><i className="fa-solid fa-arrow-left"></i></button>
                <p className='ms-5 text-white fw-bold'>Edit Activity</p>
                <DeleteModal activityId={activityId} setEditClicked={this.props.setEditClicked}/>

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
                          className='col-8 border-0 border-gray border-radius-10px entry-form-single fw-bold' />
                        <input
                          required
                          type="text"
                          name="zipCode"
                          placeholder="zip"
                          onChange={handleInputChange}
                          value={zipCode}
                          className='col-4 border-0 border-gray border-radius-10px entry-form-single fw-bold ms-1' />
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
                            checked={ages2to5}
                            name="ages2to5"
                            onChange={handleInputChange}
                            className="form-check-input" />
                          <label className="" htmlFor="flexCheckDefault">Ages 2-5</label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            checked={ages5to12}
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
}

ActivityDetails.contextType = AppContext;
ActivityDetail.contextType = AppContext;
EditActivity.contextType = AppContext;
