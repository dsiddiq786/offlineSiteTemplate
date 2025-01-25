import { IoIosInformationCircleOutline } from 'react-icons/io';

import ReviewsCarousel from './components/ReviewsCarousel';

export default function Reviews({ extraDetails, rating, totalRatings }) {
  return (
    <>
      <section className="flex flex-col gap-4">
        {/* Property Details */}
        {/* Ratings and total ratings */}
        <div className="flex flex-col gap-1">
          {/* Rating */}
          <div className="flex items-end gap-2">
            {rating > 0 && rating && (
              <span className="text-[28px] font-bold">
                {Number.isInteger(+rating) ? `${rating}.0` : rating}
              </span>
            )}
            <span className="mb-1 text-[19px] font-bold">
              {rating >= 9
                ? 'Excellent'
                : rating >= 8
                  ? 'Very Good'
                  : rating >= 7 || rating < 7
                    ? 'Good'
                    : ''}
            </span>
          </div>

          {/* Total Ratings */}
          <span className="flex items-center gap-1 text-[14px]">
            based on {totalRatings} ratings from top sites{' '}
            <IoIosInformationCircleOutline className="text-lg" />
          </span>

          {/* Site Ratings */}
          <div className="mt-1">
            <ul className="flex list-none items-center gap-8">
              {extraDetails.reviews.otherSitesRatings
                .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)) // Sort in descending order
                .map((rating, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-[12px] font-bold">
                      {rating.rating}
                    </span>
                    <img
                      alt={`Site ${index + 1}`}
                      className="w-14 object-cover"
                      loading="lazy"
                      src={rating.siteImg}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <ReviewsCarousel details={extraDetails.reviews.reviewsList} />

        {/* AI generated label */}
        <div className="">
          <a className="block" href="#">
            <span className="flex items-center gap-1 text-[12px] text-[#6c6c6b]">
              <IoIosInformationCircleOutline className="text-lg" />
              This summary was created by AI and might not be 100% accurate.
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
