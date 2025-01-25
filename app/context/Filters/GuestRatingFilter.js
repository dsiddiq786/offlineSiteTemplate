import { useState } from 'react';

export function useGuestRatingFilter() {
  const [selectedGuestRatingValues, setSelectedGuestRatingValues] = useState(
    []
  );

  const [localSelectedGuestRatingValues, setLocalSelectedGuestRatingValues] =
    useState([]);

  const toggleGuestRatingSelection = (value) => {
    if (localSelectedGuestRatingValues.includes(value)) {
      // Remove value if already selected
      setLocalSelectedGuestRatingValues(
        localSelectedGuestRatingValues.filter((item) => item !== value)
      );
    } else {
      // Add value if not already selected
      setLocalSelectedGuestRatingValues([
        ...localSelectedGuestRatingValues,
        value,
      ]);
    }
  };

  return {
    selectedGuestRatingValues,
    setSelectedGuestRatingValues,
    toggleGuestRatingSelection,
    localSelectedGuestRatingValues,
    setLocalSelectedGuestRatingValues,
  };
}
