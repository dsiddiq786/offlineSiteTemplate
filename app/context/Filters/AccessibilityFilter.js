import { useState, useMemo } from 'react';

export function useAccessibilityFilter(properties) {
  // Extract unique accessibility options from properties
  const accessibilityOptions = useMemo(() => {
    const allAccessibilityOptions = properties.flatMap(
      (property) => property.accessibility || []
    );

    return Array.from(new Set(allAccessibilityOptions)); // Remove duplicates
  }, [properties]);

  const [selectedAccessibilityOptions, setSelectedAccessibilityOptions] =
    useState([]);
  const [
    localSelectedAccessibilityOptions,
    setLocalSelectedAccessibilityOptions,
  ] = useState([]);

  const toggleAccessibilitySelection = (option) => {
    if (localSelectedAccessibilityOptions.includes(option)) {
      // Remove option if already selected
      setLocalSelectedAccessibilityOptions(
        localSelectedAccessibilityOptions.filter((item) => item !== option)
      );
    } else {
      // Add option if not already selected
      setLocalSelectedAccessibilityOptions([
        ...localSelectedAccessibilityOptions,
        option,
      ]);
    }
  };

  return {
    accessibilityOptions,
    selectedAccessibilityOptions,
    setSelectedAccessibilityOptions,
    toggleAccessibilitySelection,
    localSelectedAccessibilityOptions,
    setLocalSelectedAccessibilityOptions,
  };
}
