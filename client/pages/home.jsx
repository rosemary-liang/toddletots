import React from 'react';
import SearchBar from '../components/searchbar';

// search bar
// activity list
// title ribbon with map icon
// each individual activity component (map)

export default function Home(props) {
  return (
    <>
    <div className="home-container d-flex justify-content-center">
        <SearchBar />
    </div>

    </>
  );
}

// hash routing to # for home
