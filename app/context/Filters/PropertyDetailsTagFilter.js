import { useMemo } from 'react';

export function usePropertyDetailsTagFilter(properties) {
  // Extract unique propertyDetails tags from the properties data
  const propertyDetailsTags = useMemo(() => {
    const allTags = properties.flatMap(
      (property) =>
        property.extraDetails?.reviews?.reviewsList?.map(
          (detail) => detail.reviewTag
        ) || []
    );

    return Array.from(new Set(allTags)); // Remove duplicates
  }, [properties]);

  [
    'Services',
    'Location',
    'Facilities and amenities',
    'Cleanliness',
    'Comfort',
    'Views',
    'Dining and cuisine',
    'Style',
    'Activities',
    'Wellness',
    'Experience',
    'Recommendation',
    'Family-friendly',
    'Staff',
    'Miscellaneous',
  ];

  return {
    propertyDetailsTags,
  };
}
