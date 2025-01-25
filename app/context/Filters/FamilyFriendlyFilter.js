import { useState, useMemo } from 'react';

export function useFamilyFriendlyFilter(properties) {
  // Extract unique family-friendly options from properties
  const familyFriendlyOptions = useMemo(() => {
    const allFamilyFriendlyOptions = properties.flatMap(
      (property) => property.familyFriendly || []
    );

    return Array.from(new Set(allFamilyFriendlyOptions)); // Remove duplicates
  }, [properties]);

  const [selectedFamilyFriendlyOptions, setSelectedFamilyFriendlyOptions] =
    useState([]);
  const [
    localSelectedFamilyFriendlyOptions,
    setLocalSelectedFamilyFriendlyOptions,
  ] = useState([]);

  const toggleFamilyFriendlySelection = (option) => {
    if (localSelectedFamilyFriendlyOptions.includes(option)) {
      // Remove option if already selected
      setLocalSelectedFamilyFriendlyOptions(
        localSelectedFamilyFriendlyOptions.filter((item) => item !== option)
      );
    } else {
      // Add option if not already selected
      setLocalSelectedFamilyFriendlyOptions([
        ...localSelectedFamilyFriendlyOptions,
        option,
      ]);
    }
  };

  return {
    familyFriendlyOptions,
    selectedFamilyFriendlyOptions,
    setSelectedFamilyFriendlyOptions,
    toggleFamilyFriendlySelection,
    localSelectedFamilyFriendlyOptions,
    setLocalSelectedFamilyFriendlyOptions,
  };
}
