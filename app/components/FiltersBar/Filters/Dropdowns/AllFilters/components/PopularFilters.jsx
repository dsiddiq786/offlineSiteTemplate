import CheckboxItem from '@/app/components/FiltersBar/General/CheckBoxItem';
import { useProperties } from '@/app/context/PropertiesContext';

export default function PopularFilters() {
  const { popularFilters, togglePopularFilter, selectedAllFilters } =
    useProperties();

  return (
    <>
      <fieldset>
        <legend>
          <h4 className="text-[14px] font-medium">Popular filters</h4>
        </legend>

        {popularFilters.map((filter) => (
          <div key={filter.value} className="py-[6px]">
            <CheckboxItem
              isSelected={selectedAllFilters.includes(filter.value)} // Check if the filter is selected
              title={filter.value} // Display the value of the filter as the title
              onChange={() => togglePopularFilter(filter)} // Toggle the filter on change
            />
          </div>
        ))}
      </fieldset>
    </>
  );
}
