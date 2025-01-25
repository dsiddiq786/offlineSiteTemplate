import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { useState, useEffect, useRef } from 'react';

import SortByDropdown from './dropdown/SortByDropdown';

import { useProperties } from '@/app/context/PropertiesContext';

export default function SortBy() {
  const {
    sortOptions,
    selectedSortValue,
    setSelectedSortValue,
    localSelectedSortValue,
    setLocalSelectedSortValue,
  } = useProperties();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleApplySort = () => {
    setSelectedSortValue(localSelectedSortValue);
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
        handleApplySort();
      }

      // Close dropdown on Escape key press
      if (event.type === 'keydown' && event.key === 'Escape') {
        handleApplySort();
      }
    };

    document.addEventListener('mousedown', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('mousedown', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [setIsDropDownOpen, localSelectedSortValue]);

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
        <strong className="pl-[12px]">Sort by</strong>
        <span
          className={`flex w-full ${isDropDownOpen ? 'border-[#24a3ec]' : 'hover:border-[#24a3ec]'} items-center justify-between rounded-full border px-3 py-[6px]`}
        >
          <span
            className={` ${selectedSortValue !== 'Our recommendations' ? 'font-bold text-blue-600' : ''} `}
          >
            {selectedSortValue}
          </span>
          <span>{isDropDownOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        </span>
      </button>

      {/* Sort dropdown menu */}
      {isDropDownOpen && (
        <SortByDropdown
          handleApplySort={handleApplySort}
          localSelectedSortValue={localSelectedSortValue}
          setLocalSelectedSortValue={setLocalSelectedSortValue}
          sortOptions={sortOptions}
        />
      )}
    </div>
  );
}
