import React, { useContext } from 'react';
import AppContext from '../lib/app-context';

// update class colors depending on hash routing

export default function Footer() {
  const context = useContext(AppContext);
  const { route } = context;

  let houseIcon;
  let addIcon;
  let bookmarkIcon;
  let userIcon;

  if (route.path === '' || route.path === 'activity-details') {
    houseIcon = 'text-primary';
    addIcon = 'text-dark-gray';
    bookmarkIcon = 'text-dark-gray';
    userIcon = 'text-dark-gray';
  }
  if (route.path === 'new-entry-map' || route.path === 'new-entry-form') {
    houseIcon = 'text-dark-gray';
    addIcon = 'text-primary';
    bookmarkIcon = 'text-dark-gray';
    userIcon = 'text-dark-gray';
  }
  if (route.path === 'bookmarks') {
    houseIcon = 'text-dark-gray';
    addIcon = 'text-dark-gray';
    bookmarkIcon = 'text-primary';
    userIcon = 'text-dark-gray';
  }
  if (route.path === 'sign-in' || route.path === 'sign-up') {
    houseIcon = 'text-dark-gray';
    addIcon = 'text-dark-gray';
    bookmarkIcon = 'text-dark-gray';
    userIcon = 'text-primary';
  }

  return (
    <footer className='footer'>
      <div className='container d-flex justify-content-between align-items-end h1 py-1'>
        <a href="#">
          <i className={`fa-solid fa-house ${houseIcon}`}></i>
        </a>
        <a href="#new-entry-map">
          <i className={`fa-solid fa-circle-plus ${addIcon}`}></i>
        </a>
        <a href="#bookmarks">
          <i className={`fa-solid fa-bookmark ${bookmarkIcon}`}></i>
        </a>
        <a href="#sign-in">
          <i className={`fa-solid fa-user ${userIcon}`}></i>
        </a>
      </div>
    </footer>
  );
}
