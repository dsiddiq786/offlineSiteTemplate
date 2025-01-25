import { useState, useMemo } from 'react';

export function useActivitiesFilter(properties) {
  // Extract unique activities from properties
  const activities = useMemo(() => {
    const allActivities = properties.flatMap(
      (property) => property.activities || []
    );

    return Array.from(new Set(allActivities)); // Remove duplicates
  }, [properties]);

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [localSelectedActivities, setLocalSelectedActivities] = useState([]);

  const toggleActivitySelection = (option) => {
    if (localSelectedActivities.includes(option)) {
      // Remove option if already selected
      setLocalSelectedActivities(
        localSelectedActivities.filter((item) => item !== option)
      );
    } else {
      // Add option if not already selected
      setLocalSelectedActivities([...localSelectedActivities, option]);
    }
  };

  return {
    activities,
    selectedActivities,
    setSelectedActivities,
    toggleActivitySelection,
    localSelectedActivities,
    setLocalSelectedActivities,
  };
}
