import { FaAngleDown } from 'react-icons/fa';

import allAmenities from './Amenities';

export default function TopAmenities({ amenities }) {
  // Match amenities from props with the allAmenities list
  const matchedAmenities = allAmenities.filter((item) =>
    amenities.includes(item.title)
  );

  return (
    <>
      <section className="flex flex-col items-start gap-4 rounded-lg border p-3">
        <h2 className="text-[20px] font-bold">Top Amenities</h2>

        <ul className="grid w-full list-none grid-cols-2 gap-3 md:grid-cols-3">
          {matchedAmenities.map((amenity, index) => (
            <li key={index} className="flex items-center gap-2">
              {amenity.icon}
              <span className="text-[12px]">{amenity.title}</span>
            </li>
          ))}
        </ul>

        <button className="flex items-center gap-1 text-[14px] font-bold text-[#2582c4]">
          Show all amenities <FaAngleDown />
        </button>
      </section>
    </>
  );
}
