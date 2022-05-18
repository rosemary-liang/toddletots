import React, { useContext } from 'react';
import { AppContext } from '../lib';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';
import '@reach/combobox/styles.css';

export default function Search({ panTo, handleZip, view }) {

  const context = useContext(AppContext);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 33.6846, lng: () => -117.8265 },
      radius: 100 * 1000
    }
  });

  const handleInput = e => {
    setValue(e.target.value);
  };

  const handleSelect = async address => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      if (view === 'list') {
        handleZip({ lat, lng });
      }
      if (view === 'map' || context.route.path === 'new-entry-map') {
        panTo({ lat, lng });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search mb-4">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search"
          className='w-100 border-radius-90px fs-6 border-0 text-center'
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ reference, description }) => (
                <ComboboxOption key={reference} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
