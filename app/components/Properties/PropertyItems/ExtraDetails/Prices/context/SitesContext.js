'use client';

import { createContext, useContext, useState, useEffect } from 'react';

import { usePriceSortByFilter } from '../Filters/scripts/PriceSortByFilter';
import { usePriceRoomPropertiesFilter } from '../Filters/scripts/PriceRoomPropertiesFilter';

const SitesContext = createContext();

export function SiteProvider({ children, sites }) {
  const [filteredSites, setFilteredSites] = useState(sites);

  // Price sort by dropdown select filter
  const {
    applyPriceSort,
    priceSortByOptions,
    selectedPriceSortByValue,
    setSelectedSortByValue,
  } = usePriceSortByFilter(filteredSites, setFilteredSites);

  // Room Properties filters
  const {
    roomProperties,
    selectedRoomProperties,
    toggleRoomPropertySelection,
  } = usePriceRoomPropertiesFilter(sites);

  useEffect(() => {
    let filtered = sites
      .map((site) => {
        // Filter siteRooms: Keep only rooms that have at least one selectedRoomProperty
        const filteredRooms = site.siteRooms.filter(
          (room) =>
            selectedRoomProperties.length === 0 ||
            selectedRoomProperties.some((property) =>
              room.roomProperties.includes(property)
            )
        );

        // Return the site with filtered siteRooms if it has any matching rooms
        return filteredRooms.length > 0
          ? { ...site, siteRooms: filteredRooms }
          : null;
      })
      .filter(Boolean); // Remove null entries (sites with no matching rooms)

    // Apply price sorting if necessary
    filtered = applyPriceSort(filtered);

    // Update state with filtered sites
    setFilteredSites(filtered);
  }, [sites, selectedRoomProperties, selectedPriceSortByValue]);

  return (
    <SitesContext.Provider
      value={{
        filteredSites,
        setFilteredSites,
        priceSortByOptions,
        selectedPriceSortByValue,
        setSelectedSortByValue,
        roomProperties,
        selectedRoomProperties,
        toggleRoomPropertySelection,
      }}
    >
      {children}
    </SitesContext.Provider>
  );
}

export function useSites() {
  return useContext(SitesContext);
}
