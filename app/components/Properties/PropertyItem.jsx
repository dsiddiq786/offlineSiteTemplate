import { IoStar } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { GoHeart } from 'react-icons/go';
import { useState } from 'react';

import InfoTitles from './PropertyItems/InfoTitles';
import DistanceFromLocation from './PropertyItems/DistanceFromLocation';
import PriceBox from './PropertyItems/PriceBox';
import PropertiesTabs from './PropertyItems/Tabs';
import ExtraDetails from './PropertyItems/ExtraDetails';

import { useProperties } from '@/app/context/PropertiesContext';

export default function PropertyItem({
  lowestPrice,
  title,
  propertyType,
  rating,
  totalRatings,
  image,
  extraDetails,
  popularChoice,
  stars,
  amenities,
  location,
}) {
  const { nights, selectedProperty } = useProperties();

  const [isMorePhotos, setIsMorePhotos] = useState(false);

  const starsArray = Array.from(
    { length: stars || 0 },
    (_, index) => index + 1
  );

  // DropDown logic
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState('');

  const tabs = ['Info', 'Photos', 'Reviews', 'Prices'];

  const handleDropDown = (value) => {
    if (selectedTab === value) {
      setSelectedTab('');
      setIsDropDownOpen(false);
    } else {
      setSelectedTab(value);
      setIsDropDownOpen(true);
    }
  };

  return (
    <li
      className={`w-full rounded-lg bg-white ${selectedProperty ? (title === selectedProperty.title ? 'mb-8 border-b shadow-2xl shadow-green-200' : 'mb-0 border-none shadow-large') : 'border-none pb-0'}`}
    >
      <article
        className={`relative flex w-full overflow-hidden ${isDropDownOpen ? 'rounded-t-lg' : 'rounded-lg'} bg-white`}
      >
        {/* image */}
        <div
          className="relative h-[176px] w-[230px]"
          role="button"
          tabIndex={0}
          onClick={() => handleDropDown('Photos')}
          onKeyDown={() => {
            handleDropDown('Photos');
          }}
          onMouseEnter={() => setIsMorePhotos(true)}
          onMouseLeave={() => setIsMorePhotos(false)}
        >
          <img
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
            src={image}
          />

          {/* Popular Choice */}
          {popularChoice && (
            <span className="absolute left-0 top-0 rounded-br-lg bg-red-600 px-[7px] py-[5px] text-xs font-bold leading-none text-white">
              Popular choice
            </span>
          )}

          {/* Image Count */}
          {!isMorePhotos ? (
            <span className="absolute bottom-2 right-2 rounded bg-[#171717] p-1 text-[11px] text-white">
              1 / {extraDetails.images.length}
            </span>
          ) : (
            <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-[#171717] p-1 text-[11px] text-white">
              More photos <IoIosArrowDown />
            </span>
          )}
        </div>

        {/* Rest of the content */}
        <div className="grid flex-1 grid-cols-5 gap-2 p-2">
          {/* title side */}
          <div className="col-span-3 flex h-full w-full flex-col justify-between">
            {/* Title and favorite */}
            <div className="flex items-center justify-between">
              <span className="text-[20px] font-bold" role="button">
                {title}
              </span>{' '}
              <GoHeart className="cursor-pointer text-2xl hover:text-red-600" />
            </div>

            {/* Stars n PropertyType */}
            <div
              className="flex items-center gap-1"
              role="button"
              tabIndex={0}
              onClick={() => handleDropDown('Info')}
              onKeyDown={() => {
                handleDropDown('Info');
              }}
            >
              {/* Stars */}
              <div className="flex items-center">
                {starsArray.map((star) => (
                  <IoStar key={star} className="text-[10px] text-[#ffa24a]" />
                ))}
              </div>

              {/* Property Type */}
              <span className="text-[14px]">{propertyType}</span>
            </div>

            {/* InfoTitles */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleDropDown('Info')}
              onKeyDown={() => {
                handleDropDown('Info');
              }}
            >
              <InfoTitles extraDetails={extraDetails} />
            </div>

            {/* Distance */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleDropDown('Info')}
              onKeyDown={() => {
                handleDropDown('Info');
              }}
            >
              <DistanceFromLocation location={location} />
            </div>

            {/* Ratings */}
            <div
              className="flex items-center gap-1 py-[2px] hover:bg-[#f2f2f1]"
              role="button"
              tabIndex={0}
              onClick={() => handleDropDown('Reviews')}
              onKeyDown={() => {
                handleDropDown('Reviews');
              }}
            >
              {rating > 0 && rating && (
                <span
                  className={` ${
                    +rating > 8
                      ? 'bg-[#227950] text-white'
                      : 'bg-[#DFE0E4] text-[#171717]'
                  } rounded-lg px-[5px] py-[1px] text-[12px] font-bold`}
                >
                  {Number.isInteger(+rating) ? `${rating}.0` : rating}
                </span>
              )}
              <span className="text-[14px] font-bold">
                {rating >= 9
                  ? 'Excellent'
                  : rating >= 8
                    ? 'Very Good'
                    : rating >= 7 || rating < 7
                      ? 'Good'
                      : ''}
              </span>
              <span className="text-[14px]">({totalRatings} ratings)</span>
            </div>
          </div>

          {/* Price Side */}
          <div className="col-span-2">
            <PriceBox
              extraDetails={extraDetails}
              handleClick={handleDropDown}
              isDropDownOpen={isDropDownOpen}
              lowestPrice={lowestPrice}
              nights={nights}
            />
          </div>
        </div>
      </article>

      {/* Tabs */}
      {isDropDownOpen && (
        <>
          <div>
            <PropertiesTabs
              handleDropDown={handleDropDown}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              tabs={tabs}
            />
          </div>

          {/* extraDetails */}
          <ExtraDetails
            amenities={amenities}
            extraDetails={extraDetails}
            handleDropDown={handleDropDown}
            location={location}
            lowestPrice={lowestPrice}
            propertyType={propertyType}
            rating={rating}
            selectedTab={selectedTab}
            title={title}
            totalRatings={totalRatings}
          />
        </>
      )}
    </li>
  );
}
