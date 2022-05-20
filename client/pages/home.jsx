import React, { useContext, useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { AppContext } from '../lib';
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
    route,
    refreshActivities,
    usingCurrentLocation
  } = context;

  useEffect(() => { refreshActivities(); }, []);

  let activitiesList;
  let pageTitle;
  let noEntries;
  let backButton;

  if (route.path === '') {
    activitiesList = activities;
    pageTitle = 'Activities Nearby';
    noEntries = 'activities';
    backButton = '#';

  } else if (route.path === 'bookmarks') {
    activitiesList = bookmarks;
    pageTitle = 'Bookmarks Nearby';
    noEntries = 'bookmarks';
    backButton = '#bookmarks';
  }

  const [view, setView] = React.useState('list');
  const updateView = () => {
    setView(prev => {
      return prev === 'list' ? 'map' : 'list';
    });
  };

  useEffect(() => {
    setView('list');
  }, [route.path]);

  const handleZip = zipCoordinates => {
    context.useZipCoordinates(zipCoordinates);
    setUseCurrentLocation(false);
  };

  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  useEffect(() => {
    if (useCurrentLocation) {
      setUseCurrentLocation(context.useCurrentLocation());
    }
  }, [useCurrentLocation]);

  let id;
  let icon;
  let tooltip;
  let listDisplay;
  let mapDisplay;

  if (view === 'list') {
    id = 'home-map-view';
    icon = 'fa-map';
    tooltip = 'Map view';
    listDisplay = '';
    mapDisplay = 'd-none';
  }

  if (view === 'map') {
    id = 'list-map-view';
    icon = 'fa-list';
    tooltip = 'List view';
    listDisplay = 'd-none';
    mapDisplay = '';
  }

  const currentLocationTooltip = usingCurrentLocation ? 'Already on current location' : 'Use current location';

  return (
      <>
        <div className='text-decoration-none container '>
          <div className="">
            <div className="mt- mx-1 mx-md-4">
              <div className='d-flex justify-content-between fs-3 mb-0 w-100'>
                <p className='ms-1 text-white fw-bold'>{pageTitle}</p>
                <div>
                  <button onClick={() => setUseCurrentLocation(true)} className='mx-2 bg-transparent border-0 text-white' data-tip data-for={currentLocationTooltip} ><i className="fa-solid fa-crosshairs"></i></button>
                  <ReactTooltip id={currentLocationTooltip} place='top' effect='solid' className='fs-8 p-1'
                  >{currentLocationTooltip}</ReactTooltip>
                  <a href={backButton} onClick={updateView} data-tip data-for={id} className='me-2'>
                    <i className={`fa-solid ${icon} text-white`}></i>
                  </a>
                <ReactTooltip id={id} place='top' effect='solid' className='fs-8 p-1'>{tooltip}</ReactTooltip>
                </div>
              </div>

              <div className={listDisplay}>
              <Search handleZip={handleZip} view={view} />
                <div className='container'>
                  {activitiesList.length === 0
                    ? <div>
                        {
                          <div className='row bg-white border-radius-20px mb-4 py-4 cursor-pointer '>
                            <p className='text-center fw-bold text-brown'>No {noEntries} yet</p>
                          </div>
                        }
                      </div>
                    : <div>
                        {
                          activitiesList.map(activity => (
                          <div key={activity.activityId}><Activity activity={activity} /> </div>
                          ))
                        }
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={mapDisplay}>
          <Map currentCoordinates={currentCoordinates} view={view} />
        </div>
      </>
  );

}

function Activity(props) {
  const { activityName, images, activityId, distance, ages2to5, ages5to12 } = props.activity;

  return (
      <div onClick={() => { location.hash = `#activity-details?activityId=${activityId}`; }} className='row bg-white border-radius-20px mb-4 py-4 cursor-pointer '>
        <div className='ps-5 mb-3'>
          <div className='text-brown fs-6 fw-bold'>{activityName}</div>
          <div className='text-gray fs-7 fw-bold '>{distance} miles</div>
        </div>
        <div className='d-flex justify-content-center justify-content-lg-between'>
          <Carousel images={images}/>
          <AgeRange ages2to5={ages2to5} ages5to12={ages5to12} page="#" />
          </div>
      </div>
  );
}
