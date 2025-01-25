import { useState } from 'react';

export function useHotelRatingFilter() {
  const [selectedHotelRatingValues, setSelectedHotelRatingValues] = useState(
    []
  );

  const [localSelectedHotelRatingValues, setLocalSelectedHotelRatingValues] =
    useState([]);

  const toggleHotelRatingSelection = (value) => {
    if (localSelectedHotelRatingValues.includes(value)) {
      // Remove value if already selected
      setLocalSelectedHotelRatingValues(
        localSelectedHotelRatingValues.filter((item) => item !== value)
      );
    } else {
      // Add value if not already selected
      setLocalSelectedHotelRatingValues([
        ...localSelectedHotelRatingValues,
        value,
      ]);
    }
  };

  return {
    selectedHotelRatingValues,
    setSelectedHotelRatingValues,
    toggleHotelRatingSelection,
    localSelectedHotelRatingValues,
    setLocalSelectedHotelRatingValues,
  };
}
