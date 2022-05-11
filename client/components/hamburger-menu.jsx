import React, { useState, useContext } from 'react';
import AppContext from '../lib/app-context';
import Modal from 'react-bootstrap/Modal';

export default function HamburgerMenu() {
  const context = useContext(AppContext);
  const signOut = () => {
    context.handleSignOut();
    handleClose();
  };

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
            <a href="#" onClick={handleClose} className='text-decoration-none text-brown' >Home</a>
            <a href="#new-entry-map" onClick={handleClose} className='text-decoration-none text-brown'>Add New Activity</a>
            <a href="#bookmarks" onClick={handleClose} className='text-decoration-none text-brown'>Bookmarks</a>
            {
              context.user === null &&
              <a href="#sign-in" onClick={handleClose} className='text-decoration-none text-brown'>Sign In</a>
            }
            {
              context.user !== null &&
              <a href="#" onClick={signOut} className='text-decoration-none text-brown'>Sign Out</a>
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
