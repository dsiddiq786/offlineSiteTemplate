import { Slider } from '@heroui/slider';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useProperties } from '@/app/context/PropertiesContext';

export default function PriceRange({ filter, selectedFilter }) {
  const {
    localPriceRange,
    setLocalPriceRange,
    priceOptions,
    selectedPriceOption,
    setSelectedPriceOption,
  } = useProperties();

  const [maxInputValue, setMaxInputValue] = useState(localPriceRange[1]);
  const [minInputValue, setMinInputValue] = useState(localPriceRange[0]);
  const [inputType, setInputType] = useState({ min: 'text', max: 'text' });

  useEffect(() => {
    setMaxInputValue(localPriceRange[1]);
    setMinInputValue(localPriceRange[0]);
  }, [localPriceRange]);

  const handleSliderChange = (value) => {
    setLocalPriceRange(value);
  };

  const handleMinInputChange = (e) => {
    const newMin = parseInt(e.target.value, 10);

    if (!isNaN(newMin)) {
      setMinInputValue(newMin);
      if (newMin >= 0 && newMin <= localPriceRange[1]) {
        setLocalPriceRange([newMin, localPriceRange[1]]);
      }
    }
  };

  const handleMinInputBlur = () => {
    setMinInputValue(localPriceRange[0]);
    setInputType((prev) => ({ ...prev, min: 'text' })); // Revert type to 'text'
  };

  const handleMaxInputChange = (e) => {
    const newMax = parseInt(e.target.value, 10);

    if (!isNaN(newMax)) {
      setMaxInputValue(newMax);
      if (newMax >= localPriceRange[0] && newMax <= 1000) {
        setLocalPriceRange([localPriceRange[0], newMax]);
      }
    }
  };

  const handleMaxInputBlur = () => {
    setMaxInputValue(localPriceRange[1]);
    setInputType((prev) => ({ ...prev, max: 'text' })); // Revert type to 'text'
  };

  return (
    <>
      <article className="flex w-full flex-col gap-4">
        <h3
          className={`w-full rounded-lg px-2 py-[1px] text-[16px] ${selectedFilter ? (selectedFilter === filter.id ? 'bg-[#f2f2f1]' : '') : ''} font-bold`}
        >
          {filter.label}
        </h3>

        {/* Price Options */}
        <div className="rounded-full border p-[2px]">
          <ul className="flex w-full items-center gap-1 p-1">
            {priceOptions.map((option) => (
              <li key={uuidv4()} className="flex w-full">
                <button
                  className={`w-full rounded-full p-1 text-[14px] ${
                    selectedPriceOption === option
                      ? 'bg-[#E5f5ff] font-bold text-[#00578b] hover:bg-[#bde7ff]'
                      : 'bg-white hover:bg-[#f2f2f1]'
                  }`}
                  onClick={() => setSelectedPriceOption(option)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedPriceOption(option);
                    }
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Slider */}
        <div className="">
          <Slider
            aria-label="Price range slider"
            classNames={{
              base: 'max-w-full',
              filler: 'border',
            }}
            color="primary"
            hideValue={true}
            maxValue={1000}
            minValue={0}
            renderThumb={(props) => (
              <div
                {...props}
                className="top-1/2 cursor-grab rounded-full border border-[#1668E3] bg-[#1668E3] shadow-md shadow-gray-400"
              >
                <span className="block h-5 w-5 scale-50 rounded-full bg-[1668E3]" />
              </div>
            )}
            size="sm"
            step={5}
            value={localPriceRange}
            onChange={handleSliderChange}
          />
        </div>

        {/* Min Max Inputs */}
        <div className="flex w-full items-center gap-2">
          {/* Min */}
          <div className="flex grow flex-col gap-1">
            <label
              className="text-[12px] font-bold text-[#6c6c6b]"
              htmlFor="minPrice"
            >
              Min price
            </label>
            <div className="flex w-full rounded-lg border border-gray-400 p-2">
              <input
                className="w-full bg-transparent text-center text-[14px] focus:outline-none"
                id="minPrice"
                type={inputType.min}
                value={
                  inputType.min === 'text' ? `$${minInputValue}` : minInputValue
                }
                onBlur={handleMinInputBlur}
                onChange={handleMinInputChange}
                onFocus={() =>
                  setInputType((prev) => ({ ...prev, min: 'number' }))
                }
              />
            </div>
          </div>

          <span className="mt-4 font-extrabold">-</span>

          {/* Max */}
          <div className="flex grow flex-col gap-1">
            <label
              className="text-[12px] font-bold text-[#6c6c6b]"
              htmlFor="maxPrice"
            >
              Max price
            </label>
            <div className="flex w-full rounded-lg border border-gray-400 p-2">
              <input
                className="w-full bg-transparent text-center text-[14px] focus:outline-none"
                id="maxPrice"
                type={inputType.max}
                value={
                  inputType.max === 'text'
                    ? `$${maxInputValue}${maxInputValue === 1000 ? '+' : ''}`
                    : maxInputValue
                }
                onBlur={handleMaxInputBlur}
                onChange={handleMaxInputChange}
                onFocus={() =>
                  setInputType((prev) => ({ ...prev, max: 'number' }))
                }
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
