import { useSites } from '../../context/SitesContext';

import CheckboxItem from '@/app/components/FiltersBar/General/CheckBoxItem';

export default function PriceRoomProperties() {
  const {
    roomProperties,
    selectedRoomProperties,
    toggleRoomPropertySelection,
  } = useSites();

  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-[14px] font-bold">Filter by:</h3>
      <ul className="flex list-none flex-wrap gap-4">
        {roomProperties.map((property) => (
          <li
            key={property}
            className="overflow-hidden rounded-full border pl-1 pr-3 hover:bg-[#f2f2f1]"
          >
            <CheckboxItem
              checked={selectedRoomProperties.includes(property)}
              label={property}
              onChange={() => toggleRoomPropertySelection(property)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
