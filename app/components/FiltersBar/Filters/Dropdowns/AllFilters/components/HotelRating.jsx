import { IoStar } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';

import { useProperties } from '@/app/context/PropertiesContext';

export default function HotelRating({ filter, selectedFilter }) {
  const { toggleHotelRatingSelection, localSelectedHotelRatingValues } =
    useProperties();

  return (
    <>
      <article className="flex w-full flex-col">
        <h3
          className={`w-full rounded-lg px-2 py-[1px] text-[16px] ${selectedFilter === filter.id ? 'bg-[#f2f2f1]' : ''} font-bold`}
        >
          {filter.label}
        </h3>

        {/* Hotel Rating Options */}
        <div className="py-2">
          <ul className="flex w-full items-center justify-between gap-[1.2rem]">
            {[1, 2, 3, 4, 5].map((rating) => (
              <li key={uuidv4()} className="flex w-full">
                <button
                  className={`flex w-full items-center justify-center gap-2 rounded-full py-[6px] text-[14px] ${
                    localSelectedHotelRatingValues.includes(rating)
                      ? 'border bg-[#bde7ff] text-[#00578b] hover:border-[#00578b]'
                      : 'border hover:border-gray-600'
                  }`}
                  onClick={() => toggleHotelRatingSelection(rating)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleHotelRatingSelection(rating);
                    }
                  }}
                >
                  <span className="text-[14px] font-bold">{rating}</span>
                  <IoStar
                    className={`text-sm ${
                      localSelectedHotelRatingValues.includes(rating)
                        ? 'text-sm text-[#00578b]'
                        : 'text-[#ff9128]'
                    } `}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </>
  );
}
