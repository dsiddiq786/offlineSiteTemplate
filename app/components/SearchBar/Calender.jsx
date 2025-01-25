import { useEffect, useState } from 'react';

import { IconCalender } from '@/public/icons/icons';

export default function Calender() {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  // Function to format date as "Day, MM/DD/YY"
  const formatDisplayDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });
  };

  // Function to format date for <input type="date" />
  const formatInputDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  useEffect(() => {
    // Set initial check-in and check-out dates
    const initialCheckIn = formatInputDate('2025-01-22');
    const initialCheckOut = formatInputDate('2025-01-25');

    setCheckInDate(initialCheckIn);
    setCheckOutDate(initialCheckOut);
  }, []);

  return (
    <form className="w-full flex-grow border-r border-gray-300 p-1 md:w-min">
      <div className="flex items-center gap-3 rounded-xl p-2">
        <span>
          <IconCalender />
        </span>

        {/* Desktop View */}
        <div className="hidden w-full items-center justify-center overflow-hidden md:flex">
          <div className="flex flex-col border-r">
            <label className="text-[12px] text-[#6c6c6b]" htmlFor="checkIn">
              Check-in
            </label>
            <input
              readOnly
              className="w-28 bg-white text-[14px] font-bold"
              type="text"
              value={formatDisplayDate(checkInDate)}
            />
          </div>
          <div className="ml-4 flex flex-col">
            <label className="text-[12px] text-[#6c6c6b]" htmlFor="checkOut">
              Check-out
            </label>
            <input
              readOnly
              className="w-28 bg-white text-[14px] font-bold"
              type="text"
              value={formatDisplayDate(checkOutDate)}
            />
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex flex-col md:hidden">
          <label className="text-[12px] text-[#6c6c6b]" htmlFor="checkInOut">
            Check-in/out
          </label>
          <input
            readOnly
            className="w-36 bg-white text-[14px] font-bold"
            type="text"
            value={`${formatDisplayDate(checkInDate)} - ${formatDisplayDate(checkOutDate)}`}
          />
        </div>
      </div>
    </form>
  );
}
