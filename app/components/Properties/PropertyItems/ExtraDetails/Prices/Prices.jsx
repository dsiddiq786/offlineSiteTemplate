import { v4 as uuidv4 } from 'uuid';

import SiteItem from './components/SiteItem';
import PriceSortBy from './Filters/components/PriceSortBy';
import PriceRoomProperties from './Filters/components/PriceRoomProperties';
import { SiteProvider, useSites } from './context/SitesContext';

export default function Prices({ sites }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <SiteProvider sites={sites}>
          <SiteWithFilters />
        </SiteProvider>
      </div>
    </>
  );
}

function SiteWithFilters() {
  const { filteredSites } = useSites();

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-4 py-4">
        {/* Sort By */}
        <PriceSortBy />

        {/* Room Details */}
        <PriceRoomProperties />
      </div>

      {/* Check if filteredSites is empty */}
      {filteredSites.length === 0 ? (
        <p className="text-center text-lg font-bold text-gray-600">
          No hotels found!
        </p>
      ) : (
        <ul className="flex list-none flex-col gap-3">
          {filteredSites.map((site, index) => (
            <li key={uuidv4()}>
              <SiteItem index={index} site={site} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
