import React from 'react';

export default function SearchBar() {
  return (
    <>
      <div className="form-container searchbar d-flex justify-content-center px-2">
        <form className='d-flex justify-content-center align-items-center position-relative w-100 h-40px'>
          <input type="text" name="search" placeholder='search by zip ' className='border-radius-90px text-center bg-white w-100 h-100 px-2 border-0 fs-5 fw-bold'/>
          <button className='bg-transparent border-1 border-radius-90px px-3 me-0 h4 position-absolute h-40px button-search'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </>
  );
}
