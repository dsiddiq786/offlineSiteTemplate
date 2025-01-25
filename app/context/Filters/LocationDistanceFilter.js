import { useState, useEffect } from 'react';

import { calculateDistanceInMiles } from '@/app/utils/Distance';
import { getNearestPopularLocation } from '@/app/utils/GetNearestPopularLocation';

export function useDistanceLocationFilter(properties, selectedLocation) {
  const [referenceCoordinates, setReferenceCoordinates] = useState(null);
  const downtownDubaiCoordinates = [25.1941, 55.2781];

  // Update reference coordinates when selectedLocation changes
  useEffect(() => {
    const coordinates = properties.find(
      (prop) => selectedLocation === prop.location
    )?.propertyCoordinates;

    setReferenceCoordinates(coordinates);
  }, [selectedLocation, properties]);

  // Function to apply distance logic and update properties
  const applyDistance = (properties, selectedLocation, selectedMilesValue) => {
    return properties.map((property) => {
      let distance = 0;

      if (selectedMilesValue !== 'Any distance') {
        distance = calculateDistanceInMiles(
          downtownDubaiCoordinates,
          property.propertyCoordinates
        );

        if (distance > 0) {
          return {
            ...property,
            location: `${distance} mi from City center`,
            distance, // Add distance for sorting purposes
          };
        } else {
          return {
            ...property,
            location: `nearest to City center`,
            distance: 0, // Add distance for sorting purposes
          };
        }
      } else {
        if (selectedLocation === 'City center') {
          // Use nearest popular location logic for "City center"
          const nearest = getNearestPopularLocation(
            property.propertyCoordinates
          );

          if (nearest) {
            return {
              ...property,
              location: `${nearest.shortestDistance} miles to ${nearest.nearestLocation}`,
              distance: nearest.shortestDistance, // Add distance for sorting purposes
            };
          }
        } else {
          // Neighborhood-specific distance calculation
          if (selectedLocation && referenceCoordinates) {
            distance = calculateDistanceInMiles(
              referenceCoordinates,
              property.propertyCoordinates
            );

            if (selectedLocation !== property.location && distance > 0) {
              return {
                ...property,
                location: `${property.location}, ${distance} mi from ${selectedLocation}`,
                distance, // Add distance for sorting purposes
              };
            } else {
              if (selectedLocation !== property.location) {
                return {
                  ...property,
                  location: `${property.location}, nearest to ${selectedLocation}`,
                  distance: 0, // Add distance for sorting purposes
                };
              } else {
                return {
                  ...property,
                  location: `${property.location}`,
                  distance: 0, // Add distance for sorting purposes
                };
              }
            }
          }
        }
      }

      // Return property unchanged if no distance calculation is needed
      return { ...property, distance: 0 };
    });
  };

  return {
    applyDistance,
  };
}
