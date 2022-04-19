import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

// onClick open hamburger menu and put gray overlay over everything else (modal)

export default function HamburgerMenu() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className='text-white bg-transparent border-0' onClick={handleShow}>
        <i className="fa-solid fa-bars text-white"></i>
      </button>

      <Modal show={show} onHide={handleClose} dialogClassName='custom-dialog-menu '>
        <Modal.Body>
          <div className='d-flex flex-column fw-bold'>
            <a href="#" className='text-decoration-none text-brown'>Home</a>
            <a href="#add-new" className='text-decoration-none text-brown'>Add New Activity</a>
            <a href="#edit" className='text-decoration-none text-brown'>Edit Existing Activity</a>
            <a href="#bookmarks" className='text-decoration-none text-brown'>Bookmarks</a>
            <a href="#sign-in" className='text-decoration-none text-brown'>Sign In</a>
            <a href="#sign-out" className='text-decoration-none text-brown'>Sign Out</a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
