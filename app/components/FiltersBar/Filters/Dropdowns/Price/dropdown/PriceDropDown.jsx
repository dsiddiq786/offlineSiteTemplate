import PriceRange from '../../AllFilters/components/PriceRange';

import { useProperties } from '@/app/context/PropertiesContext';

export default function PriceDropDown({ handleResetPrice, handleApplyPrice }) {
  const { localPriceRange } = useProperties();

  return (
    <section className="trivago-box-shadow-dropdown absolute top-[110%] z-20 overflow-hidden rounded-lg bg-white md:w-[150%]">
      <div className="p-4">
        <PriceRange filter={{ id: 'price', label: 'Set price range' }} />
      </div>
      {/* Reset and apply button */}
      <div className="trivago-box-shadow-applyBtn flex w-full items-center justify-between bg-white px-[28px] py-3 text-[14px]">
        <button
          className={` ${localPriceRange[0] > 0 || localPriceRange[1] < 1000 || localPriceRange[1] > 1000 ? 'text-[#6c6c6b]' : 'cursor-not-allowed text-[#bbbbb9]'}`}
          disabled={localPriceRange[0] === 0 && localPriceRange[1] === 1000}
          onClick={() => handleResetPrice()}
        >
          Reset
        </button>
        <button
          className="rounded-lg bg-[#0079c2] px-7 py-2 font-bold text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
          onClick={() => handleApplyPrice()}
        >
          Apply
        </button>
      </div>
    </section>
  );
}
