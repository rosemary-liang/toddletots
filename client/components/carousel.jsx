import React from 'react';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
    const { images } = this.props;
    this.state = {
      activeImage: images[0]
    };
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handlePrevious() {
    const { activeImage } = this.state;
    const { images } = this.props;
    const index = images.indexOf(activeImage);
    let prevImage;
    if (index > 0) {
      prevImage = images[index - 1];
    } else {
      prevImage = images[images.length - 1];
    }
    this.setState({ activeImage: prevImage });
  }

  handleNext() {
    const { activeImage } = this.state;
    const { images } = this.props;
    const index = images.indexOf(activeImage);
    let nextImage;
    if (index >= 0 && index < images.length - 1) {
      nextImage = images[index + 1];
    } else {
      nextImage = images[0];
    }
    this.setState({ activeImage: nextImage });
  }

  render() {
    const { activeImage } = this.state;
    // console.log(this.state);

    return (
      <div className="carousel slide d-flex px-0" data-bs-ride="carousel" onClick={e => e.stopPropagation()}>
        <button onClick={this.handlePrevious} className='bg-transparent border-0 h1 text-gray'><i className="fa-solid fa-chevron-left"></i></button>
        <div className="carousel-inner mx-2">
              <div className="carousel-item active">
                <img src={activeImage.url} className="d-block w-100 border-radius-20px" alt={activeImage.caption} />
              </div>
        </div>
        <button onClick={this.handleNext} className='bg-transparent border-0 h1 text-gray'><i className="fa-solid fa-chevron-right"></i></button>
      </div>
    );
  }
}
