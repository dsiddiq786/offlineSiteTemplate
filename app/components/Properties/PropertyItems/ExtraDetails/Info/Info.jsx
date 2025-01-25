import { IoIosInformationCircleOutline } from 'react-icons/io';
import { GoThumbsup } from 'react-icons/go';
import { GoThumbsdown } from 'react-icons/go';

import InfoReviews from './components/InfoReviews';
import InfoLocation from './components/InfoLocation';
import TopAmenities from './components/TopAmenities';
import InfoAbout from './components/InfoAbout';
import InfoCarousel from './components/InforCarousel';

export default function Info({
  extraDetails,
  rating,
  totalRatings,
  amenities,
  title,
  lowestPrice,
}) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Property Details */}
        <section>
          <h2 className="mb-[16px] text-[20px] font-bold">Good to know</h2>
          <InfoCarousel details={extraDetails.info.propertyDetails} />
        </section>

        {/* AI generated label */}
        <div className="flex items-center justify-between">
          <a className="block" href="#">
            <span className="flex items-center gap-1 text-[12px] text-[#6c6c6b]">
              <IoIosInformationCircleOutline className="text-lg" />
              This summary was created by AI and might not be 100% accurate.
            </span>
          </a>

          <span className="flex items-center gap-1 text-[12px]">
            Was this helpful?
            <div className="flex items-center gap-3">
              <GoThumbsup className="text-lg" role="button" />
              <GoThumbsdown className="text-lg" role="button" />
            </div>
          </span>
        </div>

        {/* Review and location */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoReviews
            extraDetails={extraDetails}
            rating={rating}
            totalRatings={totalRatings}
          />

          <InfoLocation extraDetails={extraDetails} lowestPrice={lowestPrice} />
        </section>

        {/* Top Amenities */}
        <TopAmenities amenities={amenities} />

        {/* About */}
        <InfoAbout extraDetails={extraDetails} title={title} />
      </div>
    </>
  );
}
