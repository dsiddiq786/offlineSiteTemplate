import { IoIosSearch } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';

import { useProperties } from '@/app/context/PropertiesContext';

export default function SearchByAddress() {
  const {
    togglePopover,
    searchQuery,
    handleSearch,
    handleClearProperty,
    isOpen,
    popoverRef,
    listRef,
    filteredData,
    focusedIndex,
    setFocusedIndex,
    handleSelectProperty,
    setSearchQuery,
  } = useProperties();

  return (
    <>
      <div className="relative flex flex-col gap-2">
        <h2 className="text-[14px]">Specific Address</h2>

        <div className="w-full cursor-pointer rounded-lg border bg-white px-3">
          <div className="flex w-full items-center justify-between gap-1">
            <input
              className="w-full py-2 placeholder:text-gray-500"
              placeholder="Enter street address/zip code"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onClick={togglePopover}
            />
            {searchQuery ? (
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleClearProperty()}
              >
                ✖
              </button>
            ) : (
              <IoIosSearch className=" " />
            )}
          </div>
        </div>

        {isOpen && (
          <div
            ref={popoverRef}
            className="absolute top-[110%] z-50 w-[100%] rounded-lg bg-white shadow-lg"
          >
            <div
              ref={listRef}
              className="max-h-52 min-h-40 overflow-y-auto rounded-lg"
            >
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <div
                    key={uuidv4()}
                    className={`cursor-pointer border-b border-gray-200 p-3 last:border-b-0 ${
                      index === focusedIndex
                        ? 'bg-[#f2f2f1]' // Highlighted background
                        : 'hover:bg-[#f2f2f1]'
                    }`}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectProperty(item)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && focusedIndex >= 0) {
                        event.preventDefault(); // Prevents form submission in case of input fields

                        setLocalSelectedProperty(filteredData[focusedIndex]);
                        setSearchQuery(
                          filteredData[focusedIndex].extraDetails.info
                            .propertyAddress
                        );
                      }
                    }}
                    onMouseEnter={() => setFocusedIndex(index)} // Update focus on hover
                  >
                    <p className="text-[13px] font-semibold">{item.title}</p>
                    <p className="text-[11px] text-gray-500">
                      {item.extraDetails.info.propertyAddress}
                    </p>
                  </div>
                ))
              ) : (
                <p className="p-3 text-[13px] text-gray-500">
                  No results found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
