import { FaAngleRight, FaCheck, FaAngleDown, FaAngleUp } from 'react-icons/fa6';

import { useProperties } from '@/app/context/PropertiesContext';

export default function PriceBox({
  lowestPrice,
  extraDetails,
  nights,
  handleClick,
  isDropDownOpen,
}) {
  const { selectedPriceOption } = useProperties();

  // Extract all prices with site titles
  const pricesWithSites = extraDetails.prices.sites
    .map((site) => {
      // Extract and sort siteRooms by price in ascending order
      const sortedRooms = site.siteRooms
        .map((room) => ({
          roomPrice: Number(room.roomPrice.replace(/[$,]/g, '')),
          // Convert price to number
        }))
        .sort((a, b) => a.roomPrice - b.roomPrice);

      return {
        siteTitle: site.siteTitle,
        lowestRoomPrice:
          sortedRooms.length > 0 ? sortedRooms[0].roomPrice : null, // Take the lowest room price
      };
    })
    .filter((site) => site.lowestRoomPrice !== null); // Remove any site without valid prices

  // Sort sites by their lowest room price in ascending order
  pricesWithSites.sort((a, b) => a.lowestRoomPrice - b.lowestRoomPrice);

  // Ensure second lowest price site is always present
  let secondLowestPriceSite = null;

  if (pricesWithSites.length > 1) {
    // If there's a second site, select it as second lowest
    secondLowestPriceSite = {
      siteTitle: pricesWithSites[1].siteTitle,
      price: pricesWithSites[1].lowestRoomPrice,
    };
  } else if (pricesWithSites.length === 1) {
    // If all sites have the same price, select the second occurrence (even if same price)
    secondLowestPriceSite = {
      siteTitle: pricesWithSites[0].siteTitle,
      price: pricesWithSites[0].lowestRoomPrice,
    };
  }

  return (
    <>
      <div className="flex h-full w-full flex-col gap-2">
        {/* Lowest Price */}
        <div
          className="group flex h-full cursor-pointer flex-col justify-between gap-[2px] rounded-lg border border-[#b6f2b8] bg-[#ebfdec] p-[6px] hover:bg-[#d7fdd8]"
          role="button"
          tabIndex={0}
          onClick={() => handleClick('Prices')}
          onKeyDown={() => {
            handleDropDown('Prices');
          }}
        >
          {/* Hotel Title */}
          <div>
            <strong className="text-[12px] font-bold">
              {lowestPrice.siteTitle.replace('•Featured', '').trim()}
            </strong>
          </div>

          {/* Room Properties */}
          {lowestPrice.room.roomProperties.length > 0 && (
            <ul className="flex flex-wrap gap-1 text-[10px]">
              {lowestPrice.room.roomProperties
                .slice(0, 2)
                .map((property, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <FaCheck className="text-[#0a850e]" />
                    {property}
                  </li>
                ))}
            </ul>
          )}

          {/* Price n view deal */}
          <div className="flex w-full items-center justify-between gap-2">
            {/* Price n pernight */}
            <div className="flex flex-col">
              <div>
                <span className="text-[16px] font-bold">
                  ${lowestPrice.price}
                </span>
              </div>

              {/* Price per night total */}
              {selectedPriceOption === 'Per Night' && (
                <p className="text-[12px]">
                  {nights} nights for{' '}
                  <span className="font-bold">
                    ${lowestPrice.price * nights}
                  </span>
                </p>
              )}
              {selectedPriceOption === 'Total stay' && (
                <p className="text-[12px]">For {nights} nights </p>
              )}
            </div>

            <button className="flex items-center gap-4 whitespace-nowrap rounded-lg bg-[#0a850e] px-4 py-[6px] text-[14px] font-bold text-white hover:bg-[#075f0a] group-hover:bg-[#075f0a]">
              <span>View Deal</span>
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Other prices */}
        <div className="flex w-full items-center gap-2">
          {/* Second lowest price with hotel */}
          <button
            className="flex w-full flex-col items-start whitespace-nowrap rounded-lg bg-[#f5fbff] p-[6px] hover:bg-[#e5f5ff]"
            onClick={() => handleClick('Prices')}
          >
            <span className="text-[12px] font-bold">
              {secondLowestPriceSite.siteTitle.replace('•Featured', '').trim()}
            </span>
            <span className="text-[14px] font-bold">
              $
              {selectedPriceOption === 'Total stay'
                ? secondLowestPriceSite.price * nights
                : secondLowestPriceSite.price}
            </span>
          </button>

          {/* More prices */}
          <button
            className="bg flex items-center gap-10 rounded-lg bg-[#f5fbff] p-[6px] hover:bg-[#e5f5ff]"
            onClick={() => handleClick('Prices')}
          >
            <div className="flex flex-col items-start whitespace-nowrap text-[14px]">
              <span>More prices from</span>
              <span className="font-bold">${lowestPrice.price}</span>
            </div>
            {isDropDownOpen ? (
              <FaAngleUp className="text-[14px]" />
            ) : (
              <FaAngleDown className="text-[14px]" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
