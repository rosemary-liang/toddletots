import React, { useContext, useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import AppContext from '../lib/app-context';
import Search from '../components/search';
import Carousel from '../components/carousel';
import AgeRange from '../components/age-range';
import Map from '../components/map';

export default function Home() {

  const context = useContext(AppContext);
  const {
    activities,
    bookmarks,
    currentCoordinates,
    route
  } = context;
  // console.log('Home context:', context);

  let activitiesList;

  if (route.path === '') { activitiesList = activities; }
  if (route.path === 'bookmarks') { activitiesList = bookmarks; }

  const [view, setView] = React.useState('list');
  const updateView = () => {
    setView(prev => {
      return prev === 'list' ? 'map' : 'list';
    });
  };

  const handleZip = zipCoordinates => {
    context.useZipCoordinates(zipCoordinates);
    setUseCurrentLocation(false);
  };

  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  useEffect(() => {
    if (useCurrentLocation) {
      setUseCurrentLocation(context.useCurrentLocation());
    }
  }, []);

  let id;
  let icon;
  let tooltip;
  let listDisplay;
  let mapDisplay;
  let iconClass;

  if (view === 'list') {
    id = 'home-map-view';
    icon = 'fa-solid fa-map text-white';
    tooltip = 'Map view';
    listDisplay = '';
    mapDisplay = 'd-none';
    iconClass = '';
  }

  if (view === 'map') {
    id = 'list-map-view';
    icon = 'fa-solid fa-list text-white';
    tooltip = 'List view';
    listDisplay = 'd-none';
    mapDisplay = '';
    iconClass = '';
  }

  return (
    <>
      <div className='text-decoration-none container '>
        <div className="container  ">
            <div className="  mt-4 mx-1 mx-md-4">
              <div className=' d-flex justify-content-between h2 mb-0 w-100'>
                <p className='ms-1 text-white fw-bold'>Fun Activities Nearby</p>
                <div className={iconClass}>
                  <button onClick={() => setUseCurrentLocation(true)} className='mx-2 bg-transparent border-0 text-white' data-tip data-for='use-current-location' ><i className="fa-solid fa-crosshairs"></i></button>
                  <ReactTooltip id='use-current-location' place='top' effect='solid'>Use current location</ReactTooltip>
                  <a href="#" onClick={updateView} data-tip data-for={id} className='me-2'>
                    <i className={icon}></i>
                  </a>
                  <ReactTooltip id={id} place='top' effect='solid'>{tooltip}</ReactTooltip>
                </div>
            </div>

            <div className={listDisplay}>
                <Search handleZip={handleZip}/>

              {
                activitiesList.map(activity => (
                  <div key={activity.activityId}><Activity activity={activity} /> </div>
                ))
              }
              </div>
          </div>
        </div>
      </div>
      <div className={mapDisplay}>
        <Map currentCoordinates={currentCoordinates} />
      </div>
    </>
  );
}

function Activity(props) {
  const { activityName, images, activityId, distance, ages2to5, ages5to12 } = props.activity;

  return (
      <div onClick={() => { location.hash = `#activity-details?activityId=${activityId}`; }} className='row bg-white border-radius-20px mb-4 py-4 cursor-pointer '>
        <div className='ps-5'>
          <div className='text-brown fs-5 fw-bold'>{activityName}</div>
          <p className='text-gray fs-6 fw-bold'>{distance} miles</p>
        </div>
        <div className='d-flex justify-content-sm-center justify-content-lg-between'>
          <Carousel images={images}/>
          <AgeRange ages2to5={ages2to5} ages5to12={ages5to12} page="#" />
          </div>
      </div>
  );
}
