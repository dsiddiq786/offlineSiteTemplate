export function useDateFilter() {
  const startDate = '2025-01-22'; // 9th January 2025
  const endDate = '2025-01-25'; // 11th January 2025

  // Calculate nights
  const calculateNights = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDifference = endDate - startDate;

    return timeDifference > 0 ? timeDifference / (1000 * 60 * 60 * 24) : 0;
  };

  // Calculate actualPrice & total price\
  const nights = calculateNights(startDate, endDate);

  return { startDate, endDate, nights };
}
