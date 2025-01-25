import { useEffect, useRef, useState } from 'react';

import PriceRange from '../components/PriceRange';
import HotelRating from '../components/HotelRating';
import GuestRating from '../components/GuestRating';
import Payment from '../components/Payment';
import MealOptions from '../components/MealOptions';
import Amenities from '../components/Amenities';
import Accessibility from '../components/Accessibility';
import FamilyFriendly from '../components/FamilyFriendly';
import Activities from '../components/Activities';
import PropertyTypes from '../components/PropertyType/PropertyTypes';
import Location from '../components/Location/Location';

const filterOptions = [
  // { id: 'popular', label: 'Popular filters' },
  { id: 'price', label: 'Price' },
  { id: 'hotel_rating', label: 'Hotel rating' },
  { id: 'guest_rating', label: 'Guest rating' },
  { id: 'payment', label: 'Payment' },
  { id: 'property_type', label: 'Property type' },
  { id: 'location', label: 'Location' },
  { id: 'meal_options', label: 'Meal options' },
  { id: 'amenities', label: 'Property amenities' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'family_friendly', label: 'Family friendly' },
  { id: 'activities', label: 'Activities' },
];

import { useProperties } from '@/app/context/PropertiesContext';

export default function AllFiltersDropdown({ applyAllFilters, resetFilters }) {
  const { localSelectedFilters } = useProperties();

  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0].id);
  const [hoveredFilter, setHoveredFilter] = useState(null);

  // Refs
  const sectionRefs = useRef({});
  const scrollableContainerRef = useRef(null);
  const sidebarRef = useRef(null);

  // Function to scroll to the selected section
  const handleScrollToSection = (filterId) => {
    setSelectedFilter(filterId);
    const section = sectionRefs.current[filterId];
    const container = scrollableContainerRef.current;

    if (section && container) {
      const sectionOffsetTop = section.offsetTop; // Section's top position relative to its parent

      container.scrollTo({
        top: sectionOffsetTop,
        behavior: 'smooth',
      });
    }
  };

  // Function to track the currently visible section and highlight the corresponding sidebar option
  const handleRightScroll = () => {
    const container = scrollableContainerRef.current;

    if (!container) return;

    const containerTop = container.scrollTop;

    let closestSectionId = null;
    let closestDistance = Infinity; // Start with a large distance

    // Find the section closest to the top of the container
    Object.entries(sectionRefs.current).forEach(([filterId, sectionRef]) => {
      if (sectionRef) {
        const sectionTop = sectionRef.offsetTop - containerTop;

        // Check if this section is closer to the top than the current closest
        if (sectionTop >= 0 && sectionTop < closestDistance) {
          closestSectionId = filterId;
          closestDistance = sectionTop;
        }
      }
    });

    // Update the selected filter if a closer section is found
    if (closestSectionId && closestSectionId !== selectedFilter) {
      setHoveredFilter(closestSectionId);
    }

    // Scroll sidebar to make the selected option visible
    const sidebarItem = sidebarRef.current?.querySelector(
      `li[data-filter-id="${closestSectionId}"]`
    );

    if (sidebarItem) {
      sidebarItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  useEffect(() => {
    const container = scrollableContainerRef.current;

    // Add scroll event listener
    if (container) {
      container.addEventListener('scroll', handleRightScroll);
    }

    // Cleanup on unmount
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleRightScroll);
      }
    };
  }, [selectedFilter]);

  return (
    <section className="trivago-box-shadow-dropdown absolute top-[110%] z-20 w-full overflow-hidden rounded-lg bg-white sm:w-[150%] md:w-[300%] lg:w-[310%] xl:w-[375%]">
      <div className="flex max-h-[calc(100vh-50vh)] w-full">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className="w-[30%] overflow-y-scroll border-r p-[20px]"
        >
          <ul className="flex flex-col">
            {filterOptions.map((filter) => (
              <li key={filter.id} className="w-full">
                <button
                  className={`w-full cursor-pointer whitespace-nowrap rounded-lg px-[12px] py-[16px] text-left text-sm font-bold ${
                    selectedFilter === filter.id
                      ? 'bg-[#E5f5ff] text-[#00578b]'
                      : hoveredFilter === filter.id
                        ? 'bg-[#f2f2f1] text-[#171717]'
                        : 'text-[#6c6c6b]'
                  }`}
                  data-filter-id={filter.id}
                  onClick={() => handleScrollToSection(filter.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      handleScrollToSection(filter.id);
                    }
                  }}
                  onMouseEnter={() => setHoveredFilter(filter.id)}
                  onMouseLeave={() => setHoveredFilter(null)}
                >
                  {filter.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Section */}
        <ul
          ref={scrollableContainerRef}
          className="w-3/4 list-none overflow-y-scroll p-[20px]"
        >
          {filterOptions.map((filter, index) => (
            <li
              key={filter.id}
              ref={(el) => (sectionRefs.current[filter.id] = el)}
              className={`border-b ${index > 0 ? 'py-5' : 'pb-5'}`}
            >
              {filter.id === 'price' && (
                <PriceRange filter={filter} selectedFilter={selectedFilter} />
              )}
              {filter.id === 'hotel_rating' && (
                <HotelRating filter={filter} selectedFilter={selectedFilter} />
              )}
              {filter.id === 'guest_rating' && (
                <GuestRating filter={filter} selectedFilter={selectedFilter} />
              )}
              {filter.id === 'payment' && (
                <Payment filter={filter} selectedFilter={selectedFilter} />
              )}
              {filter.id === 'meal_options' && (
                <MealOptions filter={filter} selectedFilter={selectedFilter} />
              )}
              {filter.id === 'amenities' && (
                <Amenities filter={filter} selectedFilter={selectedFilter} />
              )}
              {filter.id === 'accessibility' && (
                <Accessibility
                  filter={filter}
                  selectedFilter={selectedFilter}
                />
              )}
              {filter.id === 'family_friendly' && (
                <FamilyFriendly
                  filter={filter}
                  selectedFilter={selectedFilter}
                />
              )}
              {filter.id === 'activities' && (
                <Activities filter={filter} selectedFilter={selectedFilter} />
              )}
              {filter.id === 'property_type' && (
                <PropertyTypes
                  filter={filter}
                  selectedFilter={selectedFilter}
                />
              )}
              {filter.id === 'location' && (
                <Location filter={filter} selectedFilter={selectedFilter} />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Reset and apply button */}
      <div className="trivago-box-shadow-applyBtn flex w-full items-center justify-between bg-white px-[28px] py-3 text-[14px]">
        <button
          className={` ${localSelectedFilters.length > 0 ? 'text-[#6c6c6b]' : 'cursor-not-allowed text-[#bbbbb9]'}`}
          disabled={localSelectedFilters.length === 0}
          onClick={() => resetFilters()}
        >
          Reset
        </button>
        <button
          className="rounded-lg bg-[#0079c2] px-7 py-2 font-bold text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
          onClick={() => applyAllFilters()}
        >
          Apply
        </button>
      </div>
    </section>
  );
}
