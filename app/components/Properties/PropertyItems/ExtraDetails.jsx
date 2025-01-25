import { BsShare } from 'react-icons/bs';

import Info from './ExtraDetails/Info/Info';
import Photos from './ExtraDetails/Photos/Photos';
import Reviews from './ExtraDetails/Reviews/Reviews';
import Prices from './ExtraDetails/Prices/Prices';

export default function ExtraDetails({
  title,
  amenities,
  rating,
  totalRatings,
  extraDetails,
  selectedTab,
  handleDropDown,
  lowestPrice,
}) {
  return (
    <>
      <div className="rounded-b-lg bg-white">
        <div className="p-6">
          {selectedTab === 'Info' && (
            <Info
              amenities={amenities}
              extraDetails={extraDetails}
              lowestPrice={lowestPrice}
              rating={rating}
              title={title}
              totalRatings={totalRatings}
            />
          )}
          {selectedTab === 'Photos' && <Photos images={extraDetails.images} />}
          {selectedTab === 'Reviews' && (
            <Reviews
              extraDetails={extraDetails}
              rating={rating}
              totalRatings={totalRatings}
            />
          )}
          {selectedTab === 'Prices' && (
            <Prices sites={extraDetails.prices.sites} />
          )}
        </div>

        {/* Close button */}
        <div className="flex items-center justify-between border-t px-4 py-3">
          <button className="flex items-center gap-2 text-[14px]">
            <BsShare />
            <span className="font-bold">Share</span>
          </button>
          <button
            className="flex items-center rounded-lg border border-[#6c6c6b] px-2 py-1 text-[14px] font-bold hover:bg-[#6c6c6b] hover:text-white"
            onClick={() => handleDropDown(selectedTab)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
