import { useState } from 'react';

export function usePriceSortByFilter() {
  const priceSortByOptions = ['Our recommendations', 'Price from low to high'];

  const [selectedPriceSortByValue, setSelectedSortByValue] = useState(
    priceSortByOptions[0]
  ); // Default selected value

  // Function to sort sites and siteRooms based on roomPrice
  function sortSitesByLowestPrice(sites) {
    // Helper function to parse price strings into numbers
    const parsePrice = (price) => Number(price.replace(/[$,]/g, ''));

    // Sort each site's siteRooms by roomPrice in ascending order
    sites.forEach((site) => {
      site.siteRooms.sort(
        (a, b) => parsePrice(a.roomPrice) - parsePrice(b.roomPrice)
      );
    });

    // Sort the sites based on the lowest roomPrice in their siteRooms
    sites.sort((siteA, siteB) => {
      const minPriceA = parsePrice(siteA.siteRooms[0].roomPrice);
      const minPriceB = parsePrice(siteB.siteRooms[0].roomPrice);

      return minPriceA - minPriceB;
    });

    return sites;
  }

  const applyPriceSort = (sites) => {
    switch (selectedPriceSortByValue) {
      case 'Our recommendations':
        const shuffledSortedSites = sortSitesByLowestPrice(sites);
        // Extract the first (lowest price) site
        const [lowestPriceSite, ...remainingSites] = shuffledSortedSites;
        // Shuffle the remaining sites randomly
        const shuffledSites = remainingSites.sort(() => Math.random() - 0.5);

        // Combine the lowestPriceSite at the top with shuffled remaining sites
        sites = [lowestPriceSite, ...shuffledSites];

        break;

      case 'Price from low to high':
        sites = sortSitesByLowestPrice(sites);

        break;

      default:
        break;
    }

    return sites;
  };

  return {
    applyPriceSort,
    priceSortByOptions,
    selectedPriceSortByValue,
    setSelectedSortByValue,
  };
}
