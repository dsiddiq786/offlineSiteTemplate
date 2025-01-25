import { useState, useMemo } from 'react';

export function useMealOptionsFilter(properties) {
  // Extract unique meal options from properties
  const mealOptions = useMemo(() => {
    const allMealOptions = properties.flatMap(
      (property) => property.mealOptions || []
    );

    return Array.from(new Set(allMealOptions)); // Remove duplicates
  }, [properties]);

  const [selectedMealOptions, setSelectedMealOptions] = useState([]);
  const [localSelectedMealOptions, setLocalSelectedMealOptions] = useState([]);

  const toggleMealOptionSelection = (option) => {
    if (localSelectedMealOptions.includes(option)) {
      // Remove option if already selected
      setLocalSelectedMealOptions(
        localSelectedMealOptions.filter((item) => item !== option)
      );
    } else {
      // Add option if not already selected
      setLocalSelectedMealOptions([...localSelectedMealOptions, option]);
    }
  };

  return {
    mealOptions,
    selectedMealOptions,
    setSelectedMealOptions,
    toggleMealOptionSelection,
    localSelectedMealOptions,
    setLocalSelectedMealOptions,
  };
}
