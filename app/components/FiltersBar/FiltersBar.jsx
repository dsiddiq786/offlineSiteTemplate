'use client';
import Filters from './Filters/Filters';

export default function FiltersBar() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto max-w-5xl py-3">
          {/* Filter By */}
          <Filters />
        </div>
      </div>
    </>
  );
}
