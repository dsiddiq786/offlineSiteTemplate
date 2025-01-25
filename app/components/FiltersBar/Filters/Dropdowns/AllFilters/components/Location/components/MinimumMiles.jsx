import { v4 as uuidv4 } from 'uuid';

import RadioItem from '@/app/components/FiltersBar/General/RadioItem';
import { useProperties } from '@/app/context/PropertiesContext';

export default function MinimumMiles({ isDropDown }) {
  const { milesOptions, localSelectedMilesValue, setLocalSelectedMilesValue } =
    useProperties();

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-[14px]">Distance from City center</h2>
      <ul
        className={` ${isDropDown ? 'flex flex-col' : 'grid list-none grid-cols-1 sm:grid-cols-2'} `}
      >
        {milesOptions.map((option) => (
          <li key={uuidv4()} className="w-full rounded-lg">
            <RadioItem
              checked={localSelectedMilesValue === option}
              label={option}
              name={'minimumMiles'}
              value={option}
              onChange={() => setLocalSelectedMilesValue(option)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
