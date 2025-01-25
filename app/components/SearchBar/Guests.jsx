import React from 'react';

import { IconGuest } from '@/public/icons/icons';

export default function Guests() {
  return (
    <>
      <form disabled className="flex-grow border-gray-300 p-1">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <span>
            <IconGuest />
          </span>
          <div className="relative flex w-full flex-col">
            <label className="text-[12px] text-[#6c6c6b]" htmlFor="destination">
              Guest and rooms
            </label>
            <input
              disabled
              className="bg-white text-[14px] font-bold"
              type="text"
              value={'3 Guests, 1 Room'}
            />
          </div>
        </div>
      </form>
    </>
  );
}
