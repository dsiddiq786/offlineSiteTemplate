import { useState } from 'react';

export function useMinimumMilesFilter() {
  const milesOptions = [
    'Any distance',
    'Less than 1 mi',
    'Less than 3 mi',
    'Less than 5 mi',
  ];
  const [selectedMilesValue, setSelectedMilesValue] = useState(milesOptions[0]); // Default selected value
  const [localSelectedMilesValue, setLocalSelectedMilesValue] =
    useState(selectedMilesValue); // Local state for changes before applying

  const applyMinimumMilesFilter = (properties) => {
    // Apply filtering based on selectedMilesValue
    if (selectedMilesValue === 'Any distance') {
      return properties; // No filtering applied
    }

    const maxMiles = parseInt(selectedMilesValue.match(/\d+/)?.[0], 10); // Extract numeric value from string (e.g., "Less than 5 mi" -> 5)

    return properties.filter((property) => property.distance <= maxMiles);
  };

  return {
    milesOptions,
    selectedMilesValue,
    setSelectedMilesValue,
    applyMinimumMilesFilter,
    localSelectedMilesValue,
    setLocalSelectedMilesValue,
  };
}
