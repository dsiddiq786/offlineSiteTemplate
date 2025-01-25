import React from 'react';

import { IconCross, IconDestination } from '@/public/icons/icons';

export default function Destination() {
  return (
    <>
      <form
        disabled
        className="w-full flex-grow border-b border-gray-300 p-1 md:w-min md:border-b-0 md:border-r"
      >
        <div className="group flex items-center gap-3 rounded-xl p-2 hover:bg-[#f2f2f1]">
          <span>
            <IconDestination />
          </span>
          <div className="relative flex w-full flex-col">
            <label className="text-[12px] text-[#6c6c6b]" htmlFor="destination">
              Destination
            </label>
            <input
              disabled
              className="bg-white text-[14px] font-bold group-hover:bg-[#f2f2f1]"
              type="search"
              value={'Dubai'}
            />
            <button disabled className="absolute right-2 top-2">
              <span>
                <IconCross />
              </span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
