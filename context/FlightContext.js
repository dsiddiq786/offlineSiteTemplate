'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const FlightContext = createContext();

// Prevent multiple interactions in the browser (optional feature)
if (typeof window !== 'undefined' && !window.filterInteractions) {
  window.currentBookingInfo = {};
  window.bookingResults = {};
}

export function FlightProvider({ children }) {
  return <FlightContext.Provider value={{}}>{children}</FlightContext.Provider>;
}

// Custom hook for consuming the FlightContext
export function useFlights() {
  return useContext(FlightContext);
}
