import { v4 as uuidv4 } from 'uuid';

import CheckboxItem from '@/app/components/FiltersBar/General/CheckBoxItem';
import { useProperties } from '@/app/context/PropertiesContext';

export default function Payment({ filter, selectedFilter }) {
  const { paymentOptions, togglePaymentSelection, localSelectedPaymentValues } =
    useProperties();

  return (
    <>
      <article className="flex w-full flex-col">
        <h3
          className={`w-full rounded-lg px-2 py-[1px] text-[16px] ${selectedFilter === filter.id ? 'bg-[#f2f2f1]' : ''} font-bold`}
        >
          {filter.label}
        </h3>

        {/* Hotel Rating Options */}
        <div className="py-2">
          <ul className="grid grid-cols-2 gap-2">
            {paymentOptions.map((option) => (
              <li key={uuidv4()} className="w-full">
                <CheckboxItem
                  checked={localSelectedPaymentValues.includes(option)}
                  label={option}
                  onChange={() => togglePaymentSelection(option)}
                />
              </li>
            ))}
          </ul>
        </div>
      </article>
    </>
  );
}
