import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function DeleteModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className='text-white bg-transparent border-0' onClick={handleShow}>
        <i className="fa-solid fa-trash-can text-white"></i>
      </button>

      <Modal show={show} onHide={handleClose} dialogClassName='custom-dialog-menu '>
        <Modal.Body>
          <div className='d-flex flex-column fw-bold font-gray'>
            <p>Are you sure you want to delete this entry?</p>
            <div>
              <button>yes</button>
              <button>no</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
