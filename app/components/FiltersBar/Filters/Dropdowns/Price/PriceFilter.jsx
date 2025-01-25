import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';

import PriceDropDown from './dropdown/PriceDropDown';

import { useProperties } from '@/app/context/PropertiesContext';

export default function PriceFilter() {
  const {
    localPriceRange,
    setDebouncedRange,
    setLocalPriceRange,
    debouncedRange,
    selectedFilters,
    setSelectedFilters,
    localSelectedFilters,
    setLocalSelectedFilters,
  } = useProperties();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleApplyPrice = () => {
    // Setting price value
    setDebouncedRange(localPriceRange);
    setIsDropDownOpen(false);
  };

  const handleResetPrice = () => {
    // Resetting price value
    setLocalSelectedFilters(
      localSelectedFilters.filter((filter) => {
        return filter !== `${localPriceRange[0]} - ${localPriceRange[1]}`;
      })
    );
    setSelectedFilters(
      selectedFilters.filter((filter) => {
        return filter !== `${localPriceRange[0]} - ${localPriceRange[1]}`;
      })
    );

    setLocalPriceRange([0, 1000]);
    setDebouncedRange([0, 1000]);
    setIsDropDownOpen(false);
  };

  const dropdownRef = useRef(null);

  // Close dropdown on clicking outside or pressing Escape
  useEffect(() => {
    const handleInteraction = (event) => {
      // Close dropdown on outside click
      if (
        event.type === 'mousedown' &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        handleApplyPrice();
      }

      // Close dropdown on Escape key press
      if (event.type === 'keydown' && event.key === 'Escape') {
        handleApplyPrice();
      }
    };

    document.addEventListener('mousedown', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('mousedown', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [setIsDropDownOpen, localPriceRange]);

  return (
    <div
      ref={dropdownRef}
      className="relative flex w-full flex-col items-center text-[14px]"
    >
      <button
        className="flex w-full flex-col gap-1"
        onClick={() => {
          setIsDropDownOpen(!isDropDownOpen);
        }}
      >
        <strong className="pl-[12px]">Price</strong>
        <span
          className={`flex w-full ${debouncedRange[0] > 0 || debouncedRange[1] < 1000 || debouncedRange[1] > 1000 ? 'border-[#24a3ec]' : 'hover:border-[#24a3ec]'} items-center justify-between rounded-full border px-3 py-[6px] text-[14px]`}
        >
          {debouncedRange[0] > 0 ||
          debouncedRange[1] < 1000 ||
          debouncedRange[1] > 1000 ? (
            <span className="font-bold text-blue-600">
              {`${debouncedRange[0]} - ${debouncedRange[1]}`}
            </span>
          ) : (
            <span>Select</span>
          )}
          <span>{isDropDownOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        </span>
      </button>

      {/* Sort dropdown menu */}
      {isDropDownOpen && (
        <PriceDropDown
          handleApplyPrice={handleApplyPrice}
          handleResetPrice={handleResetPrice}
        />
      )}
    </div>
  );
}
