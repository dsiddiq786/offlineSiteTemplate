import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';

import LocationDropdown from './dropdown/LocationDropdown';

import { useProperties } from '@/app/context/PropertiesContext';

export default function LocationFilter() {
  const {
    locations,
    selectedLocation,
    setSelectedLocation,
    localSelectedLocation,
    setLocalSelectedLocation,
    selectedProperty,
    setSelectedProperty,
    localSelectedProperty,
    setLocalSelectedProperty,
    selectedFilters,
    setSelectedFilters,
    localSelectedFilters,
    setLocalSelectedFilters,
    milesOptions,
    selectedMilesValue,
    setSelectedMilesValue,
    localSelectedMilesValue,
    setLocalSelectedMilesValue,
  } = useProperties();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleApplyLocation = () => {
    // Setting location
    setSelectedLocation(localSelectedLocation);

    // setting address
    setSelectedProperty(localSelectedProperty);

    // setting minimum miles value
    setSelectedMilesValue(localSelectedMilesValue);

    setIsDropDownOpen(false);
  };

  const handleResetLocation = () => {
    // Resetting price value
    setLocalSelectedFilters(
      localSelectedFilters.filter((filter) => {
        return (
          filter !== localSelectedLocation &&
          filter !== 'Address' &&
          filter !== localSelectedMilesValue
        );
      })
    );
    setSelectedFilters(
      selectedFilters.filter((filter) => {
        return (
          filter !== localSelectedLocation &&
          filter !== 'Address' &&
          filter !== localSelectedMilesValue
        );
      })
    );

    setLocalSelectedLocation(locations[0]);
    setSelectedLocation(locations[0]);

    setLocalSelectedProperty(null);
    setSelectedProperty(null);

    setLocalSelectedMilesValue(milesOptions[0]);
    setSelectedMilesValue(milesOptions[0]);

    setIsDropDownOpen(false);
  };

  const dropdownRef = useRef(null);

  // Close dropdown on clicking outside or pressing Escape
  useEffect(() => {
    const handleInteraction = (event) => {
      // Close dropdown on outside click
      if (
        event.type === 'mousedown' &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        handleApplyLocation();
      }

      // Close dropdown on Escape key press
      if (event.type === 'keydown' && event.key === 'Escape') {
        handleApplyLocation();
      }
    };

    document.addEventListener('mousedown', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('mousedown', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [
    setIsDropDownOpen,
    selectedLocation,
    selectedMilesValue,
    selectedProperty,
  ]);

  return (
    <div
      ref={dropdownRef}
      className="relative flex w-full flex-col items-center text-[14px]"
    >
      <button
        className="flex w-full flex-col gap-1"
        onClick={() => {
          setIsDropDownOpen(!isDropDownOpen);
        }}
      >
        <strong className="pl-[12px]">Location</strong>
        <span
          className={`flex w-full ${selectedLocation !== 'City center' || selectedMilesValue !== 'Any distance' || selectedProperty ? 'border-[#24a3ec]' : 'hover:border-[#24a3ec]'} items-center justify-between rounded-full border px-3 py-[6px] text-[14px]`}
        >
          <span className="flex items-center">
            {selectedLocation !== 'City center' && (
              <span className="font-bold text-blue-600">
                {selectedLocation},&nbsp;
              </span>
            )}
            {selectedMilesValue !== 'Any distance' && (
              <span className="font-bold text-blue-600">
                {selectedMilesValue},&nbsp;
              </span>
            )}
            {selectedProperty && (
              <span className="font-bold text-blue-600">Address,&nbsp;</span>
            )}
            {selectedLocation === 'City center' &&
              selectedMilesValue === 'Any distance' &&
              !selectedProperty && <span>Select</span>}
          </span>
          <span>{isDropDownOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        </span>
      </button>

      {/* Sort dropdown menu */}
      {isDropDownOpen && (
        <LocationDropdown
          handleApplyLocation={handleApplyLocation}
          handleResetLocation={handleResetLocation}
        />
      )}
    </div>
  );
}
