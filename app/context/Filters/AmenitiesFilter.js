import { useState, useMemo } from 'react';

export function useAmenitiesFilter(properties) {
  // Extract unique amenities from properties
  const amenities = useMemo(() => {
    const allAmenities = properties.flatMap(
      (property) => property.amenities || []
    );

    return Array.from(new Set(allAmenities)); // Remove duplicates
  }, [properties]);

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [localSelectedAmenities, setLocalSelectedAmenities] = useState([]);

  const toggleAmenitySelection = (option) => {
    if (localSelectedAmenities.includes(option)) {
      // Remove option if already selected
      setLocalSelectedAmenities(
        localSelectedAmenities.filter((item) => item !== option)
      );
    } else {
      // Add option if not already selected
      setLocalSelectedAmenities([...localSelectedAmenities, option]);
    }
  };

  return {
    amenities,
    selectedAmenities,
    setSelectedAmenities,
    toggleAmenitySelection,
    localSelectedAmenities,
    setLocalSelectedAmenities,
  };
}
