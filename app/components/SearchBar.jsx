'use client';
// Import NextUI Input component
// Import NextUI Divider component

import Destination from './SearchBar/Destination';
import Calender from './SearchBar/Calender';
import Guests from './SearchBar/Guests';

const SearchBar = () => {
  return (
    <div className="container mx-auto max-w-5xl py-4">
      <div className="md:trivago-box-shadow mx-5 flex flex-col items-center rounded-xl md:flex-row md:justify-center">
        {/* Destination */}
        <Destination />

        <div className="flex flex-grow items-center justify-center">
          {/* Calender */}
          <Calender />
          {/* Guests and Rooms */}
          <Guests />
        </div>

        {/* Search Button */}
        <div className="p-2">
          <button className="rounded-lg bg-blue-600 px-7 py-3 text-[16px] font-bold text-white hover:bg-blue-700 focus:ring focus:ring-blue-300">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
