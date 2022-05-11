import React from 'react';

export default function AgeRange(props) {
  const { ages2to5, ages5to12, page } = props;

  let age2to5check;
  let age5to12check;

  if (ages2to5) {
    age2to5check = 'fa-solid fa-square-check d-inline-block';
  } else {
    age2to5check = 'fa-solid fa-square d-inline-block';
  }

  if (ages5to12) {
    age5to12check = 'fa-solid fa-square-check d-inline-block';
  } else {
    age5to12check = 'fa-solid fa-square d-inline-block';
  }

  let className;
  let pClassName;
  if (page === '#') {
    className = 'home-age-range fs-5 fw-bold p-5 w-50';
    pClassName = 'd-inline-block text-black ms-4';
  } else if (page === '#activities') {
    className = 'h5 fw-bold mt-5';
    pClassName = 'd-inline-block text-black ms-4 fw-normal';
  } else if (page === '#new-entry-success') {
    className = ' d-inline-block h5 fw-bold mt-5';
    pClassName = 'd-inline-block text-black ms-4 fw-normal';
  }

  return (
  <div className={className}>
    <p className='text-brown fw-bold'>Age Range</p>
    <div className="age-range-line">
      <i className={age2to5check}></i>
      <p className={pClassName}>2-5 years</p>
    </div>
    <div className="age-range-line">
      <i className={age5to12check}></i>
      <p className={pClassName}>5-12 years</p>
    </div>
  </div>
  );
}
