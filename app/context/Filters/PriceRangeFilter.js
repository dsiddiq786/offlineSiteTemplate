import { useState } from 'react';

export function usePriceRangeFilter(nights) {
  const priceOptions = ['Per Night', 'Total stay'];
  const [selectedPriceOption, setSelectedPriceOption] = useState(
    priceOptions[0]
  ); // Initial slider range

  const [localPriceRange, setLocalPriceRange] = useState([0, 1000]); // Initial slider range
  const [debouncedRange, setDebouncedRange] = useState(localPriceRange); // Debounced range for global updates

  const applyPriceOption = (properties) => {
    return properties.map((property) => {
      let updatedProperty = { ...property };

      // Store original price if not stored yet
      if (!updatedProperty.lowestPrice.originalPrice) {
        updatedProperty.lowestPrice.originalPrice =
          updatedProperty.lowestPrice.price;
      }

      switch (selectedPriceOption) {
        case 'Total stay':
          updatedProperty.lowestPrice.price =
            updatedProperty.lowestPrice.originalPrice * nights;
          break;

        case 'Per Night':
          updatedProperty.lowestPrice.price =
            updatedProperty.lowestPrice.originalPrice;
          break;

        default:
          break;
      }

      return updatedProperty;
    });
  };

  return {
    applyPriceOption,
    localPriceRange,
    setLocalPriceRange,
    debouncedRange,
    setDebouncedRange,
    priceOptions,
    selectedPriceOption,
    setSelectedPriceOption,
  };
}
