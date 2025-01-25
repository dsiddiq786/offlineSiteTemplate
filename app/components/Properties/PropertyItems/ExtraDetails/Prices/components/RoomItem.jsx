import { FaAngleRight, FaCheck } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

import { useProperties } from '@/app/context/PropertiesContext';
import parsePrice from '@/app/utils/ParsePrice';

export default function RoomItem({ siteRoom }) {
  const { selectedPriceOption, nights } = useProperties();

  return (
    <>
      <div
        className={`group flex flex-row items-end gap-1 border-b bg-white p-2 hover:bg-[#f2f2f1]`}
      >
        {/* img */}
        <div className="w-5" />
        {/* Middle content */}
        <div className="flex w-full flex-col">
          {/* Room */}
          <div
            key={siteRoom.roomTitle}
            className="mt-2 flex justify-between text-[12px]"
          >
            <div className="flex flex-col">
              <p>{siteRoom.roomTitle}</p>
              <ul className="flex flex-col">
                {siteRoom.roomProperties.map((property) => (
                  <li key={uuidv4()} className="flex items-center gap-1">
                    <FaCheck className={`text-xs`} />
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
                    {selectedPriceOption === 'Total stay' && (
                      <span>${parsePrice(siteRoom.roomPrice) * nights}</span>
                    )}
                    {selectedPriceOption === 'Per Night' && (
                      <span>${parsePrice(siteRoom.roomPrice)}</span>
                    )}
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
        </div>
        {/* Visit site button */}
        <div>
          <button
            className={`ml-[20px] flex items-center gap-2 whitespace-nowrap rounded-lg border border-[#0a850e] px-[16px] py-2 text-[14px] font-bold text-[#0a850e] hover:bg-[#0a850e] hover:text-white group-hover:bg-[#075f0a] group-hover:text-white`}
          >
            <span>Visit site</span>
            <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
}
