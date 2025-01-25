import { useState, useEffect } from 'react';

export function useChips(
  selectedNeighborhood,
  selectedStayOption,
  selectedStarRatingValues,
  selectedGuestRatingOption,
  selectedAmenities,
  selectedMealPlans,
  selectedHotelsRewards,
  isAvailable,
  isReserveNow,
  isFullyRefunded,
  selectedTravelerExperiences,
  selectedAccessibilityOptions,
  selectedPropertyTypes,
  selectedBedrooms,
  localPriceRange,
  debouncedRange,
  setSelectedNeighborhood,
  setSelectedStayOption,
  setSelectedStarRatingValues,
  setSelectedGuestRatingOption,
  toggleAmenitySelection,
  toggleMealPlanSelection,
  toggleHotelsRewardSelection,
  setIsAvailable,
  setIsReserveNow,
  setIsFullyRefunded,
  toggleTravelerExperienceSelection,
  toggleAccessibilitySelection,
  togglePropertyTypeSelection,
  toggleBedroomSelection,
  setLocalPriceRange
) {
  const [chips, setChips] = useState([]);

  const updateChips = () => {
    const newChips = [
      ...(selectedNeighborhood.length > 0 && selectedNeighborhood !== 'Dubai'
        ? [{ type: 'neighborhood', value: selectedNeighborhood }]
        : []),
      ...(selectedStayOption !== 'Any'
        ? [{ type: 'stayOption', value: selectedStayOption }]
        : []),
      ...selectedStarRatingValues.map((star) => ({
        type: 'starRating',
        value: `${star} Stars`,
      })),
      ...(selectedGuestRatingOption !== 'Any'
        ? [{ type: 'guestRating', value: selectedGuestRatingOption }]
        : []),
      ...selectedAmenities.map((amenity) => ({
        type: 'amenity',
        value: amenity,
      })),
      ...selectedMealPlans.map((mealPlan) => ({
        type: 'mealPlan',
        value: mealPlan,
      })),
      ...selectedHotelsRewards.map((reward) => ({
        type: 'hotelsReward',
        value: reward,
      })),
      ...(isAvailable
        ? [{ type: 'availability', value: 'Available Now' }]
        : []),
      ...(isReserveNow ? [{ type: 'paymentType', value: 'Reserve Now' }] : []),
      ...(isFullyRefunded
        ? [{ type: 'cancellation', value: 'Fully Refundable' }]
        : []),
      ...selectedTravelerExperiences.map((exp) => ({
        type: 'travelerExperience',
        value: exp,
      })),
      ...selectedAccessibilityOptions.map((accessibility) => ({
        type: 'accessibility',
        value: accessibility,
      })),
      ...selectedPropertyTypes.map((propertyType) => ({
        type: 'propertyType',
        value: propertyType,
      })),
      ...selectedBedrooms.map((bedroom) => ({
        type: 'bedroom',
        value: bedroom,
      })),
      ...(debouncedRange[0] > 0 || debouncedRange[1] < 1000
        ? [
            {
              type: 'priceRange',
              value: `$${debouncedRange[0]} - $${debouncedRange[1]}`,
            },
          ]
        : []),
    ];

    setChips(newChips);
  };

  useEffect(updateChips, [
    selectedNeighborhood,
    selectedStayOption,
    selectedStarRatingValues,
    selectedGuestRatingOption,
    selectedAmenities,
    selectedMealPlans,
    selectedHotelsRewards,
    isAvailable,
    isReserveNow,
    isFullyRefunded,
    selectedTravelerExperiences,
    selectedAccessibilityOptions,
    selectedPropertyTypes,
    selectedBedrooms,
    debouncedRange,
  ]);

  const removeChip = (chip) => {
    switch (chip.type) {
      case 'neighborhood':
        setSelectedNeighborhood('Dubai');
        break;
      case 'stayOption':
        setSelectedStayOption('Any');
        break;
      case 'starRating':
        setSelectedStarRatingValues(
          selectedStarRatingValues.filter(
            (value) => value !== parseInt(chip.value)
          )
        );
        break;
      case 'guestRating':
        setSelectedGuestRatingOption('Any');
        break;
      case 'amenity':
        toggleAmenitySelection(chip.value);
        break;
      case 'mealPlan':
        toggleMealPlanSelection(chip.value);
        break;
      case 'hotelsReward':
        toggleHotelsRewardSelection(chip.value);
        break;
      case 'availability':
        setIsAvailable(false);
        break;
      case 'paymentType':
        setIsReserveNow(false);
        break;
      case 'cancellation':
        setIsFullyRefunded(false);
        break;
      case 'travelerExperience':
        toggleTravelerExperienceSelection(chip.value);
        break;
      case 'accessibility':
        toggleAccessibilitySelection(chip.value);
        break;
      case 'propertyType':
        togglePropertyTypeSelection(chip.value);
        break;
      case 'bedroom':
        toggleBedroomSelection(chip.value);
        break;
      case 'priceRange':
        setLocalPriceRange([0, 1000]); // Reset to default range
        break;
      default:
        break;
    }
  };

  return { chips, removeChip };
}
