import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // send fetch request to load activities from shortest to greatest distance from zip code
  }

  render() {
    // console.log('this.state.value:', this.state.value);
    return (
    <>
      <div className="form-container searchbar d-flex justify-content-center px-2">
        <form className='d-flex justify-content-center align-items-center position-relative w-100 h-40px'>
          <input type="text" value={this.state.value} onChange={this.handleChange} name="search" placeholder='search by zip ' className='border-radius-90px text-center bg-white w-100 h-100 px-2 border-0 fs-5 fw-bold'/>
          <button type="submit" onClick={this.handleSubmit} className='bg-transparent border-1 border-radius-90px px-3 me-0 h4 position-absolute h-40px button-search'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </>
    );
  }
}
