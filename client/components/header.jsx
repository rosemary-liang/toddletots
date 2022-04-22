import React from 'react';
import HamburgerMenu from './hamburger-menu';

export default function Header() {
  return (
    <header className='mb-2'>
      <nav>
        <div className="container bg-primary h1 d-flex justify-content-between align-items-center rounded">
          <div className='position-relative'>
            <HamburgerMenu />
          </div>
          <div className="d-flex flex-row">
            <div className="trees-logo-container position-relative me-4 h1">
              <i className="fa-solid fa-tree position-absolute text-primary fa-tree-1"></i>
              <i className="fa-solid fa-tree position-absolute text-white fa-tree-2"></i>
              <i className="fa-solid fa-tree fa-tree-3 text-white"></i>
            </div>
            <a href="#" className="h1 fw-bold mt-1 text-white text-decoration-none">ToddleTots</a>
          </div>
          <div className="user">
            <a href="#user"><i className="fa-solid fa-user text-white"></i></a>
          </div>
        </div>
      </nav>

    </header>
  );
}
