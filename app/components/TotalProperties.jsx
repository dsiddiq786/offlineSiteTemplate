import { IoIosInformationCircleOutline } from 'react-icons/io';
import { ImLocation } from 'react-icons/im';
import { useEffect, useState } from 'react';

import { useProperties } from '../context/PropertiesContext';
import ExtractUniqueImages from '../utils/UniqueImageFinder';
export default function TotalProperties() {
  const { allProperties, filteredProperties } = useProperties();
  const [totalSites, setTotalSites] = useState(0);

  useEffect(() => {
    setTotalSites(ExtractUniqueImages(allProperties).length);
  }, [allProperties]);

  return (
    <>
      <div className="flex flex-col items-center gap-8 pb-2 md:flex-row">
        {/* Total Properities */}
        <div className="flex w-full items-center justify-between">
          <span className="block text-[14px]">
            We found <strong>{filteredProperties.length}</strong> hotels from{' '}
            <strong>{totalSites}</strong> sites
          </span>

          <a className="block" href="#">
            <span className="flex items-center gap-1 text-[12px] text-[#6c6c6b]">
              How payments to us affect ranking{' '}
              <IoIosInformationCircleOutline className="text-lg" />
            </span>
          </a>
        </div>

        {/* Map */}
        <div className="relative flex w-[35%] items-center overflow-hidden rounded-lg bg-white p-[2px]">
          <img
            alt=""
            className="h-12 w-full rounded-lg object-cover"
            loading="lazy"
            src="/images/map.png"
          />
          <div className="absolute flex w-full items-center justify-center">
            <button
              className="flex items-center gap-2 rounded-lg border border-[#6c6c6b] bg-white px-4 py-[6px] text-[14px] font-bold hover:bg-[#6c6c6b] hover:text-white"
              onClick={() => handleDropDown(selectedTab)}
            >
              <ImLocation className="text-lg" />
              View map
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
