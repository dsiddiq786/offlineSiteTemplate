import AllFilters from './Dropdowns/AllFilters/AllFilters';
import LocationFilter from './Dropdowns/Location/LocationFilter';
import PriceFilter from './Dropdowns/Price/PriceFilter';
import SortBy from './Dropdowns/SortBy/SortBy';

export default function Filters() {
  return (
    <div className="grid w-full auto-cols-fr grid-flow-row place-items-center gap-2 px-[16px] md:grid-flow-col">
      <SortBy />
      <PriceFilter />
      <AllFilters />
      <LocationFilter />
    </div>
  );
}
