import { useState, useMemo } from 'react';

export function usePropertyTypeFilter(properties) {
  // Extract unique stay options and property types from properties
  const extractedPropertyFilters = useMemo(() => {
    const allStayOptions = properties.map(
      (property) => property.stayOption || ''
    );
    const allPropertyTypes = properties.map(
      (property) => property.propertyType || ''
    );

    return {
      stayOptions: Array.from(new Set(allStayOptions)), // Remove duplicates
      propertyTypes: Array.from(new Set(allPropertyTypes)), // Remove duplicates
    };
  }, [properties]);

  // Define the relationship between stayOptions and potential propertyTypes
  const stayOptionMapping = {
    Hotels: ['Hotel', 'Resort', 'Serviced apartment'],
    'Houses / Apartments': ['Entire House / Apartment', 'Casa rural'],
    'Budget stays': [
      'Bed & Breakfast',
      'Guesthouse',
      'Hostel',
      'Motel',
      'Hostal',
      'Camping site',
      'Pousada',
    ],
  };

  const propertyTypeOptions = extractedPropertyFilters.stayOptions.map(
    (stayOption) => ({
      stayOption,
      propertyTypes: stayOptionMapping[stayOption].filter((type) =>
        extractedPropertyFilters.propertyTypes.includes(type)
      ),
    })
  );

  // Global states
  const [selectedStayOptions, setSelectedStayOptions] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);

  // Local states
  const [localSelectedStayOptions, setLocalSelectedStayOptions] = useState([]);
  const [localSelectedPropertyTypes, setLocalSelectedPropertyTypes] = useState(
    []
  );

  const [dropDownStates, setDropDownStates] = useState({});

  const toggleDropDown = (stayOption) => {
    setDropDownStates((prev) => ({
      ...prev,
      [stayOption]: !prev[stayOption], // Toggle only the clicked dropdown
    }));
  };

  const togglePropertyTypeSelection = (type) => {
    setLocalSelectedPropertyTypes(
      (prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type) // Remove if already selected
          : [...prev, type] // ✅ Add if not selected
    );

    // Find the corresponding stayOption for the selected property type
    const correspondingStayOption = propertyTypeOptions.find((el) =>
      el.propertyTypes.includes(type)
    )?.stayOption;

    // console.log(correspondingStayOption);

    if (!correspondingStayOption) return; // Exit if no stay option found

    // ✅ Ensure the stayOption is toggled only if it is in localSelectedStayOptions
    setLocalSelectedStayOptions(
      (prev) =>
        prev.includes(correspondingStayOption)
          ? prev.filter((item) => item !== correspondingStayOption) // Remove if toggled property type is removed
          : prev //
    );
  };

  // Toggle stay option selection (local only)
  const toggleStayOptionSelection = (option) => {
    if (localSelectedStayOptions.includes(option)) {
      // Deselect stay option & remove its property types
      setLocalSelectedStayOptions((prev) =>
        prev.filter((item) => item !== option)
      );

      setLocalSelectedPropertyTypes((prev) =>
        prev.filter(
          (type) =>
            !propertyTypeOptions
              .find((el) => el.stayOption === option)
              ?.propertyTypes.includes(type)
        )
      );
    } else {
      // ✅ Select stay option & add its property types
      setLocalSelectedStayOptions((prev) => [...prev, option]);

      setLocalSelectedPropertyTypes((prev) => [
        ...prev,
        ...(propertyTypeOptions.find((el) => el.stayOption === option)
          ?.propertyTypes || []),
      ]);
    }
  };

  return {
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
  };
}
