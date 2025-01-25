import { v4 as uuidv4 } from 'uuid';

import { useProperties } from '@/app/context/PropertiesContext';

export default function GuestRating({ filter, selectedFilter }) {
  const { toggleGuestRatingSelection, localSelectedGuestRatingValues } =
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
            {[7.0, 7.5, 8.0, 8.5].map((rating) => (
              <li key={uuidv4()} className="flex w-full">
                <button
                  className={`flex w-full items-center justify-center gap-2 rounded-full py-[6px] text-[14px] ${
                    localSelectedGuestRatingValues.includes(rating)
                      ? 'border bg-[#bde7ff] text-[#00578b] hover:border-[#00578b]'
                      : 'border hover:border-gray-600'
                  }`}
                  onClick={() => toggleGuestRatingSelection(rating)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleGuestRatingSelection(rating);
                    }
                  }}
                >
                  <span className="text-[14px] font-bold">{rating}+</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </>
  );
}
