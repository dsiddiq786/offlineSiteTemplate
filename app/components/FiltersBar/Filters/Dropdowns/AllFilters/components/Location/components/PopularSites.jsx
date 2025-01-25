import { v4 as uuidv4 } from 'uuid';

import { useProperties } from '@/app/context/PropertiesContext';

export default function PopularSites() {
  const { locations, localSelectedLocation, setLocalSelectedLocation } =
    useProperties();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[14px]">Popular Sites</h2>
      <div className="w-full cursor-pointer rounded-lg border bg-white px-3">
        <select
          className="w-full py-2"
          value={localSelectedLocation}
          onChange={(e) => setLocalSelectedLocation(e.target.value)}
        >
          {locations.map((option) => (
            <option key={uuidv4()} value={option}>
              {option}
            </option>
          ))}
          {localSelectedLocation}
        </select>
      </div>
    </div>
  );
}
