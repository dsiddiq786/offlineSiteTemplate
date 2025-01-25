import { v4 as uuidv4 } from 'uuid';

import RadioItem from '@/app/components/FiltersBar/General/RadioItem';

export default function SortByDropdown({
  sortOptions,
  localSelectedSortValue,
  setLocalSelectedSortValue,
  handleApplySort,
}) {
  return (
    <section className="trivago-box-shadow-dropdown absolute top-[110%] z-20 overflow-hidden rounded-lg bg-white md:w-[100%] lg:w-[110%] xl:w-[125%]">
      <ul className="list-none p-2">
        {sortOptions.map((option) => (
          <li key={uuidv4()} className="rounded-lg">
            <RadioItem
              checked={localSelectedSortValue === option}
              label={option}
              name={'sort'}
              value={option}
              onChange={() => setLocalSelectedSortValue(option)}
            />
          </li>
        ))}
      </ul>
      <div className="trivago-box-shadow-applyBtn flex w-full items-center justify-end bg-white px-[28px] py-3">
        <button
          className="rounded-lg bg-[#0079c2] px-7 py-2 text-[14px] font-bold text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
          onClick={() => handleApplySort()}
        >
          Apply
        </button>
      </div>
    </section>
  );
}
