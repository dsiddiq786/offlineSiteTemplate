import { useState, useEffect } from 'react';

export function usePopularFilters(
  mealPlans,
  selectedMealPlans,
  toggleMealPlanSelection,
  hotelsRewards,
  selectedHotelsRewards,
  toggleHotelsRewardSelection,
  travelerExperiences,
  selectedTravelerExperiences,
  toggleTravelerExperienceSelection,
  availabilityOptions,
  isAvailable,
  setIsAvailable
) {
  const [popularFilters, setPopularFilters] = useState([]);
  const [selectedPopularFilters, setSelectedPopularFilters] = useState([]);
  const [selectedAllFilters, setSelectedAllFilters] = useState([]);

  useEffect(() => {
    setSelectedAllFilters([
      ...selectedHotelsRewards,
      ...selectedMealPlans,
      ...selectedTravelerExperiences,
      isAvailable ? 'Only show available properties' : '',
    ]);
  }, [
    selectedHotelsRewards,
    selectedMealPlans,
    selectedTravelerExperiences,
    isAvailable,
  ]);

  useEffect(() => {
    const randomMealPlan = mealPlans[0];
    const randomHotelReward = hotelsRewards[0];
    const randomTravelerExperience = travelerExperiences[0];
    const randomAvailability = availabilityOptions[0]; // Assuming availability is a boolean or a fixed option

    setPopularFilters([
      { type: 'mealPlan', value: randomMealPlan },
      { type: 'hotelReward', value: randomHotelReward },
      { type: 'travelerExperience', value: randomTravelerExperience },
      { type: 'availability', value: randomAvailability },
    ]);
  }, []);

  // Toggle popular filter
  const togglePopularFilter = (filter) => {
    switch (filter.type) {
      case 'mealPlan':
        toggleMealPlanSelection(filter.value);
        break;
      case 'hotelReward':
        toggleHotelsRewardSelection(filter.value);
        break;
      case 'travelerExperience':
        toggleTravelerExperienceSelection(filter.value);
        break;
      case 'availability':
        setIsAvailable(!isAvailable);
        break;
      default:
        break;
    }

    // Update selectedPopularFilters
    setSelectedPopularFilters((prev) =>
      prev.includes(filter.value)
        ? prev.filter((item) => item !== filter.value)
        : [...prev, filter.value]
    );
  };

  return {
    popularFilters,
    togglePopularFilter,
    selectedAllFilters,
    selectedPopularFilters,
  };
}
