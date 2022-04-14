import React from 'react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    const { images } = this.props;
    this.state = {
      activeImage: images[0]
    };
  }

  // add method for handleNext and handlePrevious

  render() {
    const { images } = this.props;
    // console.log('images:', images);
    const { activityId } = images;

    // if activeImage then make class "carousel-item active"; else just "carousel-item"
    // let carouselClass;
    // const { activeImage } = this.state;

    return (
      <div id={activityId} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {
            images.map(image => (
              <div key={image.imageId} className="carousel-item active">
                <img src={image.url} className="d-block w-100 border-radius-20px" alt={image.caption} />
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
