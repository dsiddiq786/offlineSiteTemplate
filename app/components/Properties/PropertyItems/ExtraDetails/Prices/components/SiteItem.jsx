import { v4 as uuidv4 } from 'uuid';
import { FaAngleDown, FaAngleRight, FaAngleUp, FaCheck } from 'react-icons/fa6';
import { useState } from 'react';

import RoomItem from './RoomItem';

import { useProperties } from '@/app/context/PropertiesContext';
import parsePrice from '@/app/utils/ParsePrice';

export default function SiteItem({ index, site }) {
  const { selectedPriceOption, nights } = useProperties();
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <>
      <div
        className={`cursor-pointer ${index === 0 ? 'border-[#b6f2b8]' : ''} w-full rounded-lg border pb-[6px]`}
      >
        {/* First site with lowest price */}
        <div
          className={`group flex items-end gap-1 p-2 ${index === 0 ? 'bg-[#ebfdec] hover:bg-[#d7fdd8]' : 'bg-white hover:bg-[#f2f2f1]'} ${site.siteRooms.length - 1 > 0 ? 'border-b' : ''}`}
        >
          {/* img */}
          <div className="self-start">
            <img
              alt={site.siteTitle}
              className="w-5 object-cover"
              loading="lazy"
              src={site.siteImg}
            />
          </div>
          {/* Middle content */}
          <div className="flex w-full flex-col">
            {/* title and lowest price */}
            <div className="flex w-full items-center justify-between text-[12px]">
              <p className="font-bold">
                {site.siteTitle.replace('•Featured', '').trim()}
              </p>
              {index === 0 && (
                <span className="rounded border border-[#c1183a] bg-white px-[3px] font-bold leading-tight text-[#c1183a]">
                  Our lowest price
                </span>
              )}
            </div>
            {/* Rooms*/}
            {site.siteRooms.slice(0, 1).map((siteRoom) => (
              // code inside the map function
              <div
                key={siteRoom.roomTitle}
                className="mt-2 flex justify-between text-[12px]"
              >
                <div className="flex flex-col">
                  <p>{siteRoom.roomTitle}</p>
                  <ul className="flex flex-col">
                    {siteRoom.roomProperties.map((property) => (
                      <li key={uuidv4()} className="flex items-center gap-1">
                        <FaCheck
                          className={` ${index === 0 ? 'text-[#0a850e]' : ''} text-xs`}
                        />
                        {property}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  {/* Price n pernight */}
                  <div className="flex flex-col items-end">
                    <div>
                      <span className="text-[16px] font-bold">
                        $
                        {selectedPriceOption === 'Per Night'
                          ? parsePrice(siteRoom.roomPrice)
                          : parsePrice(siteRoom.roomPrice) * nights}
                      </span>
                    </div>
                    {/* Price per night total */}
                    {selectedPriceOption === 'Per Night' && (
                      <p className="text-[12px]">
                        {nights} nights for{' '}
                        <span className="font-bold">
                          ${parsePrice(siteRoom.roomPrice) * nights}
                        </span>
                      </p>
                    )}
                    {selectedPriceOption === 'Total stay' && (
                      <p className="text-[12px]">For {nights} nights </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Visit site button */}
          <div>
            <button
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg ${index === 0 ? 'border-none bg-[#0a850e] text-white hover:bg-[#075f0a]' : 'border border-[#0a850e] text-[#0a850e] hover:bg-[#0a850e] hover:text-white group-hover:text-white'} ml-[20px] px-[16px] py-2 text-[14px] font-bold group-hover:bg-[#075f0a]`}
            >
              <span>Visit site</span>
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* More rooms */}
        {isShowMore && (
          <>
            <ul className="list-none">
              {site.siteRooms
                .slice(1, site.siteRooms.length)
                .map((siteRoom) => (
                  <li key={uuidv4()}>
                    <RoomItem siteRoom={siteRoom} />
                  </li>
                ))}
            </ul>
          </>
        )}

        {site.siteRooms.length - 1 > 0 && (
          <>
            {/* Show more button */}
            <div className="mx-[6px] w-full">
              <button
                className="group/showMoreBtn flex items-center gap-2 bg-white pt-2 text-[12px] text-[#2582c4]"
                onClick={() => setIsShowMore(!isShowMore)}
              >
                {!isShowMore ? (
                  <>
                    <FaAngleDown />
                    <span className="group-hover/showMoreBtn:underline">
                      Show{' '}
                      <strong>{site.siteRooms.length - 1} more prices</strong>{' '}
                      from {site.siteTitle.replace('•Featured', '').trim()}
                    </span>
                  </>
                ) : (
                  <>
                    <FaAngleUp />
                    <span className="group-hover/showMoreBtn:underline">
                      Show fewer prices
                    </span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
