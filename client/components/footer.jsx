import React from 'react';

// update class colors depending on hash routing

export default function Footer() {
  return (
    <footer>
      <div className='container d-flex justify-content-between align-items-end h1 py-1'>
        <a href="#">
          <i className="fa-solid fa-house"></i>
        </a>
        <a href="#add-new">
          <i className="fa-solid fa-circle-plus"></i>
        </a>
        <a href="#">
          <i className="fa-solid fa-bookmark"></i>
        </a>
        <a href="#">
          <i className="fa-solid fa-user"></i>
        </a>
      </div>
    </footer>
  );
}
