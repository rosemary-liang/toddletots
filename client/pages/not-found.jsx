import React from 'react';

export default function NotFound(props) {
  return (

      <div className="row">
        <div className="d-flex flex-column text-center mb-5 text-white">
          <p>Uh oh, we could not find the page you were looking for!</p>
          <a href="#" className='text-brown fw-bold fs-5 '>Return Home</a>
        </div>
      </div>

  );
}
