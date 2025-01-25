import { useState, useMemo } from 'react';

export function useLocationFilter(properties) {
  // Extract unique locations from properties
  const locations = useMemo(() => {
    let allLocations = properties.map((property) => property.location || '');

    allLocations = Array.from(new Set(allLocations)); // Remove duplicates

    allLocations = allLocations.sort((a, b) => {
      if (a === 'City center') return -1; // Move "Dubai" to the front
      if (b === 'City center') return 1;

      return 0; // Keep other neighborhoods as they are
    });

    return allLocations;
  }, [properties]);

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [localSelectedLocation, setLocalSelectedLocation] = useState(
    locations[0]
  );

  return {
    locations,
    selectedLocation,
    setSelectedLocation,
    localSelectedLocation,
    setLocalSelectedLocation,
  };
}
