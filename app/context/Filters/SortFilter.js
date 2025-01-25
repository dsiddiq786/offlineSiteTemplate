import { useState } from 'react';

export function useSortFilter() {
  const sortOptions = [
    'Our recommendations',
    'Rating & Recommended',
    'Price & Recommended',
    'Distance & Recommended',
    'Rating only',
    'Price only',
    'Distance only',
  ];
  const [selectedSortValue, setSelectedSortValue] = useState(sortOptions[0]); // Default selected value
  const [localSelectedSortValue, setLocalSelectedSortValue] =
    useState(selectedSortValue); // Default selected value

  const applySort = (properties) => {
    // Apply sorting based on selected sort value
    switch (selectedSortValue) {
      case 'Our recommendations':
        // Sort properties where `popularChoice` is true to the top
        properties.sort((a, b) => {
          return (b.popularChoice ? 1 : 0) - (a.popularChoice ? 1 : 0);
        });
        break;

      case 'Rating & Recommended':
        // Sort by `popularChoice` first, then by rating (descending)
        properties.sort((a, b) => {
          if (b.popularChoice !== a.popularChoice) {
            return b.popularChoice ? 1 : -1;
          }

          return b.rating - a.rating;
        });
        break;

      case 'Price & Recommended':
        // Sort by `popularChoice` first, then by price (ascending)
        properties.sort((a, b) => {
          if (b.popularChoice !== a.popularChoice) {
            return b.popularChoice ? 1 : -1;
          }

          return a.lowestPrice.price - b.lowestPrice.price;
        });
        break;

      case 'Rating only':
        // Sort properties by rating in descending order
        properties.sort((a, b) => b.rating - a.rating);
        break;

      case 'Price only':
        // Sort properties by lowestPrice.price in ascending order
        properties.sort((a, b) => a.lowestPrice.price - b.lowestPrice.price);
        break;

      case 'Distance & Recommended':
        // Sort properties by distance in ascending order
        properties.sort((a, b) => {
          if (b.popularChoice !== a.popularChoice) {
            return b.popularChoice ? 1 : -1;
          }

          return a.distance - b.distance;
        });
        break;
      //
      case 'Distance only':
        // Sort properties by distance in ascending order
        properties.sort((a, b) => a.distance - b.distance);
        break;

      default:
        break;
    }

    return properties;
  };

  return {
    sortOptions,
    selectedSortValue,
    setSelectedSortValue,
    applySort,
    localSelectedSortValue,
    setLocalSelectedSortValue,
  };
}
