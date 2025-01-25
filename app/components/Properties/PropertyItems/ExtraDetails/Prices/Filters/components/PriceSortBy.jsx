import { useSites } from '../../context/SitesContext';

export default function PriceSortBy() {
  const {
    priceSortByOptions,
    selectedPriceSortByValue,
    setSelectedSortByValue,
  } = useSites();

  // Function to handle selection change
  const handleChange = (event) => {
    setSelectedSortByValue(event.target.value);
  };

  return (
    <>
      <section className="flex flex-col gap-2">
        <h3 className="text-[14px] font-bold">Sort by:</h3>

        <select
          className="cursor-pointer rounded-full border p-2 text-[14px] focus:outline-none"
          value={selectedPriceSortByValue}
          onChange={handleChange}
        >
          {priceSortByOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </section>
    </>
  );
}
