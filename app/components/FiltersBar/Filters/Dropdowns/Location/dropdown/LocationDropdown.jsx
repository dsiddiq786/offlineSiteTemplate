import MinimumMiles from '../../AllFilters/components/Location/components/MinimumMiles';
import PopularSites from '../../AllFilters/components/Location/components/PopularSites';
import SearchByAddress from '../../AllFilters/components/Location/components/SearchByAddress';

import { useProperties } from '@/app/context/PropertiesContext';

export default function LocationDropdown({
  handleApplyLocation,
  handleResetLocation,
}) {
  const {
    localSelectedMilesValue,
    localSelectedProperty,
    localSelectedLocation,
  } = useProperties();

  return (
    <section className="trivago-box-shadow-dropdown absolute top-[110%] z-20 overflow-hidden rounded-lg bg-white md:w-[130%]">
      <div className="p-4">
        <article className="flex w-full flex-col gap-3">
          {/* Popular sites and address */}
          <PopularSites />
          <SearchByAddress />

          {/* Distance from city center */}
          <MinimumMiles isDropDown={true} />
        </article>
      </div>
      {/* Reset and apply button */}
      <div className="trivago-box-shadow-applyBtn flex w-full items-center justify-between bg-white px-[28px] py-3 text-[14px]">
        <button
          className={` ${localSelectedLocation !== 'City center' || localSelectedMilesValue !== 'Any distance' || localSelectedProperty ? 'text-[#6c6c6b]' : 'cursor-not-allowed text-[#bbbbb9]'}`}
          disabled={
            localSelectedLocation === 'City center' &&
            localSelectedMilesValue === 'Any distance' &&
            !localSelectedProperty
          }
          onClick={() => handleResetLocation()}
        >
          Reset
        </button>
        <button
          className="rounded-lg bg-[#0079c2] px-7 py-2 font-bold text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
          onClick={() => handleApplyLocation()}
        >
          Apply
        </button>
      </div>
    </section>
  );
}
