'use client';

import { Pagination } from '@heroui/react';
import { useState, useEffect } from 'react';
import { FaAngleUp } from 'react-icons/fa6';

import Notification from '../Notification';

import PropertyItem from './PropertyItem';

import { useProperties } from '@/app/context/PropertiesContext';

export default function Properties() {
  const { filteredProperties } = useProperties();

  // Pagination State
  const ITEMS_PER_PAGE = 35;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  // Calculate items to display for the current page
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top whenever pagination changes
  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  return (
    <>
      <div className="flex w-full flex-col items-center gap-5 border-b pb-7">
        <div className="flex w-full flex-col gap-4">
          {filteredProperties.length === 0 ? (
            <ol className="w-full list-none text-center text-lg font-medium">
              No properties found!
            </ol>
          ) : (
            <>
              <ol className="flex w-full list-none flex-col gap-3">
                {paginatedProperties.map((property, index) => (
                  <PropertyItem key={index} {...property} />
                ))}
              </ol>
            </>
          )}
        </div>
        {/* Pagination Component */}
        <div className="flex items-center gap-12">
          <Pagination
            key={currentPage}
            showControls
            classNames={{
              item: 'rounded-lg text-[#6c6c6b] font-semibold hover:border hover:border-[#6c6c6b] bg-transparent hover:bg-white',
              cursor: 'bg-[#6c6c6b] rounded-lg ',
            }}
            initialPage={currentPage}
            page={currentPage}
            total={totalPages}
            variant="default"
            onChange={(page) => setCurrentPage(page)} // Update page on change
          />

          {/* Scroll to Top Button */}
          <button
            aria-label="Scroll to top"
            className="rounded-lg bg-[#6c6c6b] px-4 py-[10px] text-white"
            onClick={scrollToTop}
          >
            <FaAngleUp className="text-sm" />
          </button>
        </div>
      </div>

      <div className="py-5">
        <Notification />
      </div>
    </>
  );
}
