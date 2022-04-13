import React from 'react';

export default function SearchBar() {
  return (
    <>
      <div className="form-container w-100 d-flex justify-content-center">
        <form className='d-flex justify-content-center align-items-center position-relative w-60'>
          <input type="text" name="search" placeholder='search by zipcode' className='border-radius-90px text-center bg-white w-100 h-35px px-2 border-0 '/>
          <button className='bg-transparent border-1 border-radius-90px px-3 me-0 h4 position-absolute h-35px button-crosshairs'>
            <i className="fa-solid fa-crosshairs "></i>
          </button>
        </form>
      </div>
    </>
  );
}
