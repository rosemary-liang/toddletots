import React from 'react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    const { images } = this.props;
    this.state = {
      activeImageId: images[0]
      // need to update to use default to smallest integer imageId of the activityId
    };

  }

  // add method to handleNext and handlePrevious

  render() {
    const { images } = this.props;
    // console.log('images:', images);
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
