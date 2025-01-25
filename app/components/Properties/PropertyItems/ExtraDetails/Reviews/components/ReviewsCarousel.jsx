import { useState } from 'react';
import { IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5';

import allReviewTags from './ReviewTags';

export default function ReviewsCarousel({ details }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  // Break the cards into chunks of 3
  const chunkedDetails = [];

  for (let i = 0; i < details.length; i += itemsPerPage) {
    chunkedDetails.push(details.slice(i, i + itemsPerPage));
  }

  const handleNext = () => {
    if (currentIndex + 1 < chunkedDetails.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getTagWithIcon = (tag) => {
    const matchedTag = allReviewTags.find((item) => item.title === tag);

    return matchedTag ? matchedTag.icon : null;
  };

  return (
    <div className="relative">
      <div className="relative w-full overflow-hidden">
        {/* Carousel Container */}
        <ul
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Shift by chunks
          }}
        >
          {chunkedDetails.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className="flex w-full shrink-0 gap-3"
              style={{ flexBasis: '100%' }} // Each chunk takes up the full width
            >
              {chunk.map((detail, index) => (
                <li
                  key={index}
                  className="flex w-1/3 flex-col gap-2 rounded-lg border px-[24px] py-[12px]"
                >
                  <span className="flex w-min items-center gap-1 whitespace-nowrap rounded py-[2px] text-[16px]">
                    <span className="text-[14px]">
                      {getTagWithIcon(detail.reviewTag)}
                    </span>
                    {detail.reviewTag}
                  </span>
                  <div>
                    <p className="text-[14px]">{detail.reviewDescription}</p>
                  </div>
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>
      {/* Previous Button */}
      {currentIndex > 0 && (
        <button
          className="absolute -left-4 top-1/2 flex -translate-y-1/2 transform items-center rounded-lg bg-white p-2 shadow shadow-gray-600"
          onClick={handlePrev}
        >
          <IoChevronBackOutline className="text-lg font-bold" />
        </button>
      )}
      {/* Next Button */}
      {currentIndex + 1 < chunkedDetails.length && (
        <button
          className="absolute -right-4 top-1/2 flex -translate-y-1/2 transform items-center rounded-lg bg-white p-2 shadow shadow-gray-600"
          onClick={handleNext}
        >
          <IoChevronForwardOutline className="text-lg font-bold" />
        </button>
      )}
    </div>
  );
}
