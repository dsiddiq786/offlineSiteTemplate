import { useState, useEffect } from 'react';
import { IoIosInformationCircleOutline } from 'react-icons/io';

export default function InfoReviews({ extraDetails, rating, totalRatings }) {
  const names = ['Neil', 'Sophia', 'Adam', 'Susan', 'Liam', 'Emma', 'Noah'];
  const [randomName, setRandomName] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Function to pick a random name
    const getRandomName = () => {
      const randomIndex = Math.floor(Math.random() * names.length);

      return names[randomIndex];
    };

    // Set random name
    setRandomName(getRandomName());

    // Get today's date in the desired format
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    setCurrentDate(formattedDate);
  }, []);

  return (
    <>
      <div className="flex flex-col items-start gap-2 rounded-lg border p-3">
        <h2 className="text-[20px] font-bold">Reviews</h2>

        {/* Ratings and total ratings */}
        <div className="flex w-[80%] flex-col gap-1">
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
            <ul className="flex w-full list-none items-center justify-between gap-4">
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

        {/* Random Reviews, Reviewed by and date, Geneuine review */}
        <div className="flex flex-col gap-1">
          {/* Random Reviews */}
          <p className="text-[14px]">
            {extraDetails.reviews.reviewsList[0]?.reviewDescription}{' '}
            {extraDetails.reviews.reviewsList[1]?.reviewDescription}
          </p>

          {/* Reviewed by and date */}
          <div className="flex items-center gap-2 text-[12px] text-[#6c6c6b]">
            <span className="font-bold">{randomName}</span>
            <span>{currentDate}</span>
          </div>

          {/* Geneuine review */}
          <div className="flex items-center gap-1">
            <span className="text-[12px] text-[#6c6c6b]">
              Geneuine review from
            </span>
            <img
              alt={`Site `}
              className="w-14 object-cover"
              loading="lazy"
              src={
                extraDetails.reviews.otherSitesRatings.sort(
                  (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
                )[0].siteImg
              }
            />
          </div>
        </div>

        <button className="mt-8 text-[14px] font-bold text-[#2582c4]">
          Show all reviews
        </button>
      </div>
    </>
  );
}
