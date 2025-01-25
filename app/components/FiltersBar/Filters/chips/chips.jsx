import ChipItem from './chipItem';

import { useProperties } from '@/app/context/PropertiesContext';

export default function Chips() {
  const { chips, removeChip, clearAllFilters } = useProperties();

  return (
    <>
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 py-3">
          {chips.map((chip, index) => (
            <ChipItem
              key={index}
              title={chip.value}
              onClose={() => removeChip(chip)}
            />
          ))}
          {chips.length > 1 && (
            <button
              className="text-[13px] text-[#1668E3] underline decoration-[#1668E3]"
              onClick={clearAllFilters}
            >
              Remove all filters
            </button>
          )}
        </div>
      )}
    </>
  );
}
