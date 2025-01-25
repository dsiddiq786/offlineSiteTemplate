import { useState, useMemo } from 'react';

export function usePriceRoomPropertiesFilter(sites) {
  // Extract unique roomProperties from all sites
  const roomProperties = useMemo(() => {
    const allProperties = sites.flatMap((site) =>
      site.siteRooms.flatMap((room) => room.roomProperties || [])
    );

    return Array.from(new Set(allProperties)); // Remove duplicates
  }, [sites]);

  const [selectedRoomProperties, setSelectedRoomProperties] = useState([]);

  const toggleRoomPropertySelection = (property) => {
    if (selectedRoomProperties.includes(property)) {
      // Remove property if already selected
      setSelectedRoomProperties(
        selectedRoomProperties.filter((item) => item !== property)
      );
    } else {
      // Add property if not already selected
      setSelectedRoomProperties([...selectedRoomProperties, property]);
    }
  };

  //     useEffect(() => {
  //         if (selectedRoomProperties.length > 0) {
  //             const filteredSitesByProperties = sites.filter((site) =>
  //                 site.siteRooms.some((room) =>
  //                     selectedRoomProperties.every((property) =>
  //                         room.roomProperties.includes(property)
  //                     )
  //                 )
  //             );
  //
  //             setFilteredSites(filteredSitesByProperties);
  //         }
  //
  //
  //     }, [selectedRoomProperties])

  return {
    roomProperties,
    selectedRoomProperties,
    setSelectedRoomProperties,
    toggleRoomPropertySelection,
  };
}
