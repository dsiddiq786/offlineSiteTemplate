/**
 * Calculates the distance in miles between two coordinates using the Haversine formula.
 *
 * @param {Array<number>} coords1 - The [latitude, longitude] of the first location.
 * @param {Array<number>} coords2 - The [latitude, longitude] of the second location.
 * @returns {number} - The distance in miles between the two coordinates.
 */
export function calculateDistanceInMiles(coords1, coords2) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const R = 3958.8; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c).toFixed(2); // Distance in miles
}
