import { v4 as uuidv4 } from 'uuid';

import PropertyTypesItem from './PropertyTypesItem';

import { useProperties } from '@/app/context/PropertiesContext';

export default function PropertyTypes({ filter, selectedFilter }) {
  const { propertyTypeOptions } = useProperties();

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
          <ul className="flex w-full flex-col">
            {propertyTypeOptions.map((option) => (
              <PropertyTypesItem key={uuidv4()} propertyTypeOption={option} />
            ))}
          </ul>
        </div>
      </article>
    </>
  );
}
