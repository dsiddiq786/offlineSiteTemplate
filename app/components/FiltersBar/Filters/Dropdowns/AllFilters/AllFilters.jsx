import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';

import AllFiltersDropdown from './dropdown/AllFiltersDropdown';

import { useProperties } from '@/app/context/PropertiesContext';

export default function AllFilters({}) {
  const {
    // Price
    localPriceRange,
    setDebouncedRange,

    // Hotel rating
    localSelectedHotelRatingValues,
    setSelectedHotelRatingValues,

    // Guest Rating
    localSelectedGuestRatingValues,
    setSelectedGuestRatingValues,

    // Payment
    localSelectedPaymentValues,
    setSelectedPaymentOptions,

    // Meal Options
    localSelectedMealOptions,
    setSelectedMealOptions,

    // Amenities
    localSelectedAmenities,
    setSelectedAmenities,

    // Accessibility
    localSelectedAccessibilityOptions,
    setSelectedAccessibilityOptions,

    // Family friendly
    localSelectedFamilyFriendlyOptions,
    setSelectedFamilyFriendlyOptions,

    // Activities
    localSelectedActivities,
    setSelectedActivities,

    // Property Type Options
    localSelectedStayOptions,
    setSelectedStayOptions,
    localSelectedPropertyTypes,
    setSelectedPropertyTypes,

    // Location
    localSelectedLocation,
    setSelectedLocation,

    // Address
    localSelectedProperty,
    setSelectedProperty,

    // miniumm miles filter
    localSelectedMilesValue,
    setSelectedMilesValue,

    // selected filters
    selectedFilters,
    setSelectedFilters,
    localSelectedFilters,

    // reset filters
    resetAllFilters,
  } = useProperties();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // apply allFilters function
  const applyAllFilters = () => {
    // Setting price value
    setDebouncedRange(localPriceRange);

    // Setting Hotel Rating values
    setSelectedHotelRatingValues(localSelectedHotelRatingValues);

    // Setting Guest Rating Values
    setSelectedGuestRatingValues(localSelectedGuestRatingValues);

    // Setting Payment values
    setSelectedPaymentOptions(localSelectedPaymentValues);

    // Setting Meal Options
    setSelectedMealOptions(localSelectedMealOptions);

    // setting amenities
    setSelectedAmenities(localSelectedAmenities);

    // setting assecciblity
    setSelectedAccessibilityOptions(localSelectedAccessibilityOptions);

    // setting family friendly options
    setSelectedFamilyFriendlyOptions(localSelectedFamilyFriendlyOptions);

    // setting activities
    setSelectedActivities(localSelectedActivities);

    // setting Property Type Options
    setSelectedStayOptions(localSelectedStayOptions);
    setSelectedPropertyTypes(localSelectedPropertyTypes);

    // setting location
    setSelectedLocation(localSelectedLocation);

    // setting address
    setSelectedProperty(localSelectedProperty);

    // setting minimum miles value
    setSelectedMilesValue(localSelectedMilesValue);

    // setting all filters
    setSelectedFilters(localSelectedFilters);

    // close the dropdown after applying filters
    setIsDropDownOpen(false);
  };

  const resetFilters = () => {
    resetAllFilters();
    // close the dropdown after applying filters
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
        applyAllFilters();
      }

      // Close dropdown on Escape key press
      if (event.type === 'keydown' && event.key === 'Escape') {
        applyAllFilters();
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
    localPriceRange,
    localSelectedHotelRatingValues,
    localSelectedGuestRatingValues,
    localSelectedPaymentValues,
    localSelectedMealOptions,
    localSelectedAmenities,
    localSelectedAccessibilityOptions,
    localSelectedFamilyFriendlyOptions,
    localSelectedActivities,
    localSelectedStayOptions,
    localSelectedPropertyTypes,
    localSelectedLocation,
    localSelectedProperty,
    localSelectedFilters,
    localSelectedMilesValue,
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
        <strong className="pl-[12px]">Filters</strong>
        <span
          className={`flex w-full ${isDropDownOpen ? 'border-[#24a3ec]' : 'hover:border-[#24a3ec]'} items-center justify-between rounded-full border px-2 py-[6px]`}
        >
          <span
            className={` ${isDropDownOpen ? 'font-bold text-blue-600' : ''} flex w-full items-center gap-2`}
          >
            {selectedFilters.length > 0 ? (
              <span className="flex w-full items-center gap-2">
                <span className="block rounded-full bg-blue-600 px-[8px] py-[2px] text-[14px] font-bold text-white">
                  {selectedFilters.length}
                </span>
                <span className="mr-3 overflow-hidden whitespace-nowrap">
                  {selectedFilters.map((filter) => {
                    return (
                      <span
                        key={filter}
                        className="whitespace-nowrap font-bold text-blue-600"
                      >
                        {filter},&nbsp;
                      </span>
                    );
                  })}
                </span>
              </span>
            ) : (
              'Select'
            )}
          </span>
          <span className="-ml-2">
            {isDropDownOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </span>
      </button>

      {/* Sort dropdown menu */}
      {isDropDownOpen && (
        <AllFiltersDropdown
          applyAllFilters={applyAllFilters}
          resetFilters={resetFilters}
        />
      )}
    </div>
  );
}
