'use client';

import { createContext, useContext, useState, useEffect } from 'react';

import propertiesData from '../data/properties.json';
import { convertToString } from '../utils/ConvertToString';

import { useDateFilter } from './Filters/Date';
import { usePriceRangeFilter } from './Filters/PriceRangeFilter';
import { useSortFilter } from './Filters/SortFilter';
import { useHotelRatingFilter } from './Filters/HotelRatingFilter';
import { useGuestRatingFilter } from './Filters/GuestRatingFilter';
import { usePaymentFilter } from './Filters/PaymentFilter';
import { useMealOptionsFilter } from './Filters/MealOptionsFilter';
import { useAmenitiesFilter } from './Filters/AmenitiesFilter';
import { useAccessibilityFilter } from './Filters/AccessibilityFilter';
import { useFamilyFriendlyFilter } from './Filters/FamilyFriendlyFilter';
import { useActivitiesFilter } from './Filters/ActivitiesFilter';
import { usePropertyTypeFilter } from './Filters/PropertyTypeFilter';
import { useLocationFilter } from './Filters/LocationFilter';
import { useDistanceLocationFilter } from './Filters/LocationDistanceFilter';
import { useAddressFilter } from './Filters/AddressFilter';
import { useMinimumMilesFilter } from './Filters/MinimumMilesFilter';

const PropertyContext = createContext();

if (typeof window !== 'undefined' && !window.filterInteractions) {
  window.filterInteractions = {};
}

export function PropertyProvider({ children }) {
  // States for properties and filters
  const [properties] = useState(propertiesData);
  const [filteredProperties, setFilteredProperties] = useState(
    properties.sort((a, b) => {
      return (b.popularChoice ? 1 : 0) - (a.popularChoice ? 1 : 0);
    })
  );

  // No. of nights
  const { startDate, endDate, nights } = useDateFilter();

  // Price Range Filter
  const {
    applyPriceOption,
    localPriceRange,
    setLocalPriceRange,
    debouncedRange,
    setDebouncedRange,
    priceOptions,
    selectedPriceOption,
    setSelectedPriceOption,
  } = usePriceRangeFilter(nights);

  // Sort Filter
  const {
    sortOptions,
    selectedSortValue,
    setSelectedSortValue,
    applySort,
    localSelectedSortValue,
    setLocalSelectedSortValue,
  } = useSortFilter();

  // HotelRating Filter
  const {
    selectedHotelRatingValues,
    setSelectedHotelRatingValues,
    toggleHotelRatingSelection,
    localSelectedHotelRatingValues,
    setLocalSelectedHotelRatingValues,
  } = useHotelRatingFilter();

  // Guest Rating Filter
  const {
    selectedGuestRatingValues,
    setSelectedGuestRatingValues,
    toggleGuestRatingSelection,
    localSelectedGuestRatingValues,
    setLocalSelectedGuestRatingValues,
  } = useGuestRatingFilter();

  // Payment filter
  const {
    paymentOptions,
    selectedPaymentOptions,
    setSelectedPaymentOptions,
    togglePaymentSelection,
    localSelectedPaymentValues,
    setLocalSelectedPaymentValues,
  } = usePaymentFilter(properties);

  // Meal options filter
  const {
    mealOptions,
    selectedMealOptions,
    setSelectedMealOptions,
    toggleMealOptionSelection,
    localSelectedMealOptions,
    setLocalSelectedMealOptions,
  } = useMealOptionsFilter(properties);

  // Amenities filter
  const {
    amenities,
    selectedAmenities,
    setSelectedAmenities,
    toggleAmenitySelection,
    localSelectedAmenities,
    setLocalSelectedAmenities,
  } = useAmenitiesFilter(properties);

  // Accessibility filter
  const {
    accessibilityOptions,
    selectedAccessibilityOptions,
    setSelectedAccessibilityOptions,
    toggleAccessibilitySelection,
    localSelectedAccessibilityOptions,
    setLocalSelectedAccessibilityOptions,
  } = useAccessibilityFilter(properties);

  // Family friendly filter
  const {
    familyFriendlyOptions,
    selectedFamilyFriendlyOptions,
    setSelectedFamilyFriendlyOptions,
    toggleFamilyFriendlySelection,
    localSelectedFamilyFriendlyOptions,
    setLocalSelectedFamilyFriendlyOptions,
  } = useFamilyFriendlyFilter(properties);

  // Activities filter
  const {
    activities,
    selectedActivities,
    setSelectedActivities,
    toggleActivitySelection,
    localSelectedActivities,
    setLocalSelectedActivities,
  } = useActivitiesFilter(properties);

  // Property Type filter
  const {
    dropDownStates,
    toggleDropDown,
    propertyTypeOptions,
    selectedStayOptions,
    selectedPropertyTypes,
    setSelectedStayOptions,
    setSelectedPropertyTypes,
    localSelectedStayOptions,
    setLocalSelectedStayOptions,
    localSelectedPropertyTypes,
    setLocalSelectedPropertyTypes,
    toggleStayOptionSelection,
    togglePropertyTypeSelection,
  } = usePropertyTypeFilter(properties);

  // Location filter
  const {
    locations,
    selectedLocation,
    setSelectedLocation,
    localSelectedLocation,
    setLocalSelectedLocation,
  } = useLocationFilter(properties);

  // Distance from city center filter
  const { applyDistance } = useDistanceLocationFilter(
    properties,
    selectedLocation
  );

  // Address filter
  const {
    togglePopover,
    searchQuery,
    handleSearch,
    handleClearProperty,
    isOpen,
    popoverRef,
    listRef,
    filteredData,
    focusedIndex,
    setFocusedIndex,
    handleSelectProperty,
    selectedProperty,
    setSelectedProperty,
    localSelectedProperty,
    setLocalSelectedProperty,
    applyAddress,
    setFilteredData,
    setSearchQuery,
  } = useAddressFilter(filteredProperties);

  // Minimum miles filter
  const {
    milesOptions,
    selectedMilesValue,
    setSelectedMilesValue,
    applyMinimumMilesFilter,
    localSelectedMilesValue,
    setLocalSelectedMilesValue,
  } = useMinimumMilesFilter();

  // maintain an array which has the selected values of all the selected filters and it updates when the user selects a filter
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [localSelectedFilters, setLocalSelectedFilters] = useState([]);

  useEffect(() => {
    const updatedArray = [
      {
        label: 'Price',
        value: `${localPriceRange[0]} - ${localPriceRange[1]}`,
      },
      { label: 'Hotel Ratings', value: localSelectedHotelRatingValues },
      { label: 'Guest Ratings', value: localSelectedGuestRatingValues },
      { label: 'Payment', value: localSelectedPaymentValues },
      { label: 'Meal Options', value: localSelectedMealOptions },
      { label: 'Amenities', value: localSelectedAmenities },
      {
        label: 'Accessibility Options',
        value: localSelectedAccessibilityOptions,
      },
      {
        label: 'Family Friendly Options',
        value: localSelectedFamilyFriendlyOptions,
      },
      { label: 'Activities', value: localSelectedActivities },
      { label: 'Stay Options', value: localSelectedStayOptions },
      { label: 'Property Types', value: localSelectedPropertyTypes },
      { label: 'Location', value: localSelectedLocation },
      { label: 'Minimum Miles', value: localSelectedMilesValue },
    ]
      .map((filter) => convertToString(filter.value))
      .filter(
        (filter) =>
          filter !== null &&
          filter !== 'City center' &&
          filter !== '0 - 1000' &&
          filter !== 'Any distance'
      );

    localSelectedProperty ? updatedArray.push('Address') : '';
    setLocalSelectedFilters(updatedArray);
  }, [
    properties,
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
    localSelectedMilesValue,
    localSelectedProperty,
  ]);

  useEffect(() => {
    let filtered;

    // Apply price option first
    filtered = applyPriceOption(properties);

    // Apply price range filtering
    filtered = applyPriceOption(properties).filter((property) => {
      const price = property.lowestPrice.price;

      // Price range filtering: include properties based on upper and lower bounds
      const matchesPrice =
        debouncedRange[1] === 1000
          ? price >= debouncedRange[0] // Include all above 1000
          : debouncedRange[1] < 100
            ? price <= 1000 // Include all below 100
            : price >= debouncedRange[0] && price <= debouncedRange[1]; // Apply normal range

      // Hotel rating filtering
      const matchesHotelRating =
        selectedHotelRatingValues.length === 0 ||
        selectedHotelRatingValues.includes(property.stars);

      // Guest rating filtering
      const matchesGuestRating =
        selectedGuestRatingValues.length === 0 ||
        selectedGuestRatingValues.some((option) => property.rating >= option);

      // Payment filtering
      const matchesPaymentOptions =
        selectedPaymentOptions.length === 0 ||
        selectedPaymentOptions.every((option) =>
          property.payment.includes(option)
        );

      // Meal Options filtering
      const matchesMealOptions =
        selectedMealOptions.length === 0 ||
        selectedMealOptions.every((option) =>
          property.mealOptions.includes(option)
        );

      // Amenities filtering
      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every((option) =>
          property.amenities.includes(option)
        );

      // Accessibility filtering
      const matchesAccessibility =
        selectedAccessibilityOptions.length === 0 ||
        selectedAccessibilityOptions.every((option) =>
          property.accessibility.includes(option)
        );

      // Accessibility filtering
      const matchesFamilyFriendlyOptions =
        selectedFamilyFriendlyOptions.length === 0 ||
        selectedFamilyFriendlyOptions.every((option) =>
          property.familyFriendly.includes(option)
        );

      // Activities filtering
      const matchesActivities =
        selectedActivities.length === 0 ||
        selectedActivities.every((option) =>
          property.activities.includes(option)
        );

      // PropertyType filtering
      const matchesStayOptions =
        selectedStayOptions.length === 0 ||
        selectedStayOptions.includes(property.stayOption);

      const matchesProperTypes =
        selectedPropertyTypes.length === 0 ||
        selectedPropertyTypes.includes(property.propertyType);

      return (
        matchesPrice &&
        matchesHotelRating &&
        matchesGuestRating &&
        matchesPaymentOptions &&
        matchesMealOptions &&
        matchesAmenities &&
        matchesAccessibility &&
        matchesFamilyFriendlyOptions &&
        matchesActivities &&
        matchesStayOptions &&
        matchesProperTypes
      );
    });

    // Apply distance from city center filtering
    filtered = applyDistance(filtered, selectedLocation, selectedMilesValue);

    // Apply minimum miles filtering
    filtered = applyMinimumMilesFilter(filtered);

    // apply sor
    filtered = applySort(filtered);

    // check if selectedProperty is not null and is at least one of the filtered properties
    if (
      selectedProperty &&
      filtered.some((property) => property.id === selectedProperty.id)
    ) {
      filtered = applyAddress(filtered, selectedProperty);
    } else {
      setSelectedProperty(null);
      setLocalSelectedProperty(null);
      setSearchQuery('');
      setFilteredData([]);
    }

    // Update state with filtered sites

    setFilteredProperties(filtered);
  }, [
    properties,
    selectedSortValue,
    selectedPriceOption,
    debouncedRange,
    selectedHotelRatingValues,
    selectedGuestRatingValues,
    selectedPaymentOptions,
    selectedMealOptions,
    selectedAmenities,
    selectedAccessibilityOptions,
    selectedFamilyFriendlyOptions,
    selectedActivities,
    selectedStayOptions,
    selectedPropertyTypes,
    selectedLocation,
    selectedMilesValue,
    selectedProperty,
  ]);

  // make a resetAllFilters function here, which will reset every local states to the respective string or array
  // and then call this function in the clear all button in the filters
  const resetAllFilters = () => {
    setLocalPriceRange([0, 1000]);
    setSelectedPriceOption('Per Night');
    setLocalSelectedHotelRatingValues([]);
    setLocalSelectedGuestRatingValues([]);
    setLocalSelectedPaymentValues([]);
    setLocalSelectedMealOptions([]);
    setLocalSelectedAmenities([]);
    setLocalSelectedAccessibilityOptions([]);
    setLocalSelectedFamilyFriendlyOptions([]);
    setLocalSelectedActivities([]);
    setLocalSelectedStayOptions([]);
    setLocalSelectedPropertyTypes([]);
    setLocalSelectedLocation(locations[0]);
    setLocalSelectedMilesValue(milesOptions[0]);
    setLocalSelectedProperty(null);
    setLocalSelectedFilters([]);

    // Setting price value
    setDebouncedRange([0, 1000]);

    // Setting Hotel Rating values
    setSelectedHotelRatingValues([]);

    // Setting Guest Rating Values
    setSelectedGuestRatingValues([]);

    // Setting Payment values
    setSelectedPaymentOptions([]);

    // Setting Meal Options
    setSelectedMealOptions([]);

    // setting amenities
    setSelectedAmenities([]);

    // setting assecciblity
    setSelectedAccessibilityOptions([]);

    // setting family friendly options
    setSelectedFamilyFriendlyOptions([]);

    // setting activities
    setSelectedActivities([]);

    // setting Property Type Options
    setSelectedStayOptions([]);
    setSelectedPropertyTypes([]);

    // setting location
    setSelectedLocation(locations[0]);

    // setting minimum miles value
    setSelectedMilesValue(milesOptions[0]);

    // setting address
    setSelectedProperty(null);
    setFilteredData([]);
    setSearchQuery('');

    // setting all filters
    setSelectedFilters([]);
  };

  // Update global filter interactions
  const updateGlobalInteractions = () => {
    const interactions = {
      priceRange: debouncedRange,
      hotelRatings: selectedHotelRatingValues,
      guestRatings: selectedGuestRatingValues,
      payment: selectedPaymentOptions,
      stayOptions: selectedStayOptions,
      propertyType: selectedPropertyTypes,
      location: selectedLocation,
      address: selectedProperty
        ? selectedProperty.extraDetails.info.propertyAddress
        : null,
      distanceFromCityCenter: selectedMilesValue,
      mealOptions: selectedMealOptions,
      amenities: selectedAmenities,
      accessibility: selectedAccessibilityOptions,
      familyFriendly: selectedFamilyFriendlyOptions,
      activities: selectedActivities,
      sortBy: selectedSortValue,
      results: filteredProperties,
    };

    window.filterInteractions = interactions;
  };

  useEffect(() => {
    updateGlobalInteractions();
  }, [
    debouncedRange,
    selectedHotelRatingValues,
    selectedGuestRatingValues,
    selectedPaymentOptions,
    selectedStayOptions,
    selectedPropertyTypes,
    selectedLocation,
    selectedProperty,
    selectedMilesValue,
    selectedMealOptions,
    selectedAmenities,
    selectedAccessibilityOptions,
    selectedFamilyFriendlyOptions,
    selectedActivities,
    selectedSortValue,
    filteredProperties,
  ]);

  return (
    <PropertyContext.Provider
      value={{
        // properties
        allProperties: properties,
        filteredProperties,

        // selected filters
        selectedFilters,
        setSelectedFilters,
        localSelectedFilters,
        setLocalSelectedFilters,

        // reset all function
        resetAllFilters,

        // date
        startDate,
        endDate,
        nights,

        // price
        localPriceRange,
        setLocalPriceRange,
        debouncedRange,
        setDebouncedRange,
        priceOptions,
        selectedPriceOption,
        setSelectedPriceOption,

        // sort
        sortOptions,
        selectedSortValue,
        setSelectedSortValue,
        applySort,
        localSelectedSortValue,
        setLocalSelectedSortValue,

        // hotel rating
        selectedHotelRatingValues,
        setSelectedHotelRatingValues,
        toggleHotelRatingSelection,
        localSelectedHotelRatingValues,
        setLocalSelectedHotelRatingValues,

        // guest rating
        selectedGuestRatingValues,
        setSelectedGuestRatingValues,
        toggleGuestRatingSelection,
        localSelectedGuestRatingValues,
        setLocalSelectedGuestRatingValues,

        // payment
        paymentOptions,
        selectedPaymentOptions,
        setSelectedPaymentOptions,
        togglePaymentSelection,
        localSelectedPaymentValues,
        setLocalSelectedPaymentValues,

        // Meal options
        mealOptions,
        selectedMealOptions,
        setSelectedMealOptions,
        toggleMealOptionSelection,
        localSelectedMealOptions,
        setLocalSelectedMealOptions,

        // Amenities
        amenities,
        selectedAmenities,
        setSelectedAmenities,
        toggleAmenitySelection,
        localSelectedAmenities,
        setLocalSelectedAmenities,

        // Accessibility
        accessibilityOptions,
        selectedAccessibilityOptions,
        setSelectedAccessibilityOptions,
        toggleAccessibilitySelection,
        localSelectedAccessibilityOptions,
        setLocalSelectedAccessibilityOptions,

        // Family friendly
        familyFriendlyOptions,
        selectedFamilyFriendlyOptions,
        setSelectedFamilyFriendlyOptions,
        toggleFamilyFriendlySelection,
        localSelectedFamilyFriendlyOptions,
        setLocalSelectedFamilyFriendlyOptions,

        // Activities
        activities,
        selectedActivities,
        setSelectedActivities,
        toggleActivitySelection,
        localSelectedActivities,
        setLocalSelectedActivities,

        // Property Type
        dropDownStates,
        toggleDropDown,
        propertyTypeOptions,
        selectedStayOptions,
        selectedPropertyTypes,
        setSelectedStayOptions,
        setSelectedPropertyTypes,
        localSelectedStayOptions,
        setLocalSelectedStayOptions,
        localSelectedPropertyTypes,
        setLocalSelectedPropertyTypes,
        toggleStayOptionSelection,
        togglePropertyTypeSelection,

        // Location
        locations,
        selectedLocation,
        setSelectedLocation,
        localSelectedLocation,
        setLocalSelectedLocation,

        // Address
        togglePopover,
        searchQuery,
        handleSearch,
        handleClearProperty,
        isOpen,
        popoverRef,
        listRef,
        filteredData,
        focusedIndex,
        setFocusedIndex,
        handleSelectProperty,
        selectedProperty,
        setSelectedProperty,
        localSelectedProperty,
        setLocalSelectedProperty,
        setSearchQuery,

        // Minimum miles
        milesOptions,
        selectedMilesValue,
        setSelectedMilesValue,
        applyMinimumMilesFilter,
        localSelectedMilesValue,
        setLocalSelectedMilesValue,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  return useContext(PropertyContext);
}
