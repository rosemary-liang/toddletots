import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export default function DeleteModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    const { activityId, setEditClicked } = props;
    fetch(`/api/activities/${activityId}`, { method: 'DELETE' })
      .then(result => {
        if (result) {
          setEditClicked(false);
          handleClose();
        }
      });
  };

  return (
    <>
      <button className='text-white bg-transparent border-0' onClick={handleShow}>
        <i className="fa-solid fa-trash-can text-white"></i>
      </button>

      <Modal show={show} onHide={handleClose} dialogClassName='custom-dialog-delete position-absolute'>
        <Modal.Body>
          <div className='d-flex flex-column fw-bold text-dark-gray text-center p-4'>
            <p className='mb-4'>Are you sure you want to delete this entry?</p>
            <div className='d-flex justify-content-evenly'>
              <a href="#">
                <button onClick={handleDelete} className='yes-button border-radius-10px px-5 py-1 fw-bold'>yes</button></a>
              <button onClick={handleClose} className='no-button border-radius-10px px-5 py-1 fw-bold'>no</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
