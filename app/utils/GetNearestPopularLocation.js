import { calculateDistanceInMiles } from './Distance';

const popularDubaiLocations = [
  { title: 'Burj Khalifa', coordinates: [25.1972, 55.2744] },
  { title: 'Palm Jumeirah', coordinates: [25.112, 55.1386] },
  { title: 'Dubai Marina', coordinates: [25.0773, 55.1397] },
  { title: 'Dubai Mall', coordinates: [25.1985, 55.2795] },
  { title: 'Jumeirah Beach', coordinates: [25.205, 55.2486] },
  { title: 'Burj Al Arab', coordinates: [25.1412, 55.1853] },
  { title: 'Dubai Creek', coordinates: [25.2335, 55.3006] },
  { title: 'Dubai Frame', coordinates: [25.2336, 55.3001] },
  { title: 'Dubai Miracle Garden', coordinates: [25.0596, 55.2473] },
  { title: 'Global Village', coordinates: [25.0675, 55.2963] },
];

/**
 * Finds the nearest popular location and its distance to the given property coordinates.
 * @param {Array<number>} propertyCoordinates - The coordinates of the property.
 * @returns {Object} - The nearest location's title and the distance to it.
 */
export function getNearestPopularLocation(propertyCoordinates) {
  if (!propertyCoordinates || propertyCoordinates.length !== 2) return null;

  let minDistance = Infinity;
  let closestLocation = null;

  popularDubaiLocations.forEach((location) => {
    const distance = calculateDistanceInMiles(
      propertyCoordinates,
      location.coordinates
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestLocation = location.title;
    }
  });

  return { nearestLocation: closestLocation, shortestDistance: minDistance };
}
