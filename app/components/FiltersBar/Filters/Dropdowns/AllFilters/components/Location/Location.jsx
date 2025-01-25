import PopularSites from './components/PopularSites';
import SearchByAddress from './components/SearchByAddress';
import MinimumMiles from './components/MinimumMiles';

export default function Location({ filter, selectedFilter }) {
  return (
    <>
      <article className="flex w-full flex-col gap-3">
        <h3
          className={`w-full rounded-lg px-2 py-[1px] text-[16px] ${selectedFilter === filter.id ? 'bg-[#f2f2f1]' : ''} font-bold`}
        >
          {filter.label}
        </h3>

        {/* Popular sites and address */}
        <div className="grid w-full grid-cols-1 gap-4 px-2 sm:grid-cols-2">
          <PopularSites />
          <SearchByAddress />
        </div>

        {/* Distance from city center */}
        <div className="px-2">
          <MinimumMiles isDropDown={false} />
        </div>
      </article>
    </>
  );
}
