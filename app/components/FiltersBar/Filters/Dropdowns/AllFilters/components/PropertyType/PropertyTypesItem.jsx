import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

import CheckboxItem from '@/app/components/FiltersBar/General/CheckBoxItem';
import { useProperties } from '@/app/context/PropertiesContext';

export default function PropertyTypesItem({ propertyTypeOption }) {
  const {
    dropDownStates,
    toggleDropDown,
    localSelectedStayOptions,
    localSelectedPropertyTypes,
    toggleStayOptionSelection,
    togglePropertyTypeSelection,
  } = useProperties();

  const isDropDownOpen = dropDownStates[propertyTypeOption.stayOption] || false;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full items-center gap-2">
          <li className="w-full">
            <CheckboxItem
              checked={localSelectedStayOptions.includes(
                propertyTypeOption.stayOption
              )}
              label={propertyTypeOption.stayOption}
              onChange={() => {
                toggleStayOptionSelection(propertyTypeOption.stayOption);
              }}
            />
          </li>
          <button
            onClick={() => {
              toggleDropDown(propertyTypeOption.stayOption);
            }}
          >
            <span
              className={`block p-2 text-[14px] ${isDropDownOpen ? 'bg-[#f2f2f1]' : 'hover:bg-[#f2f2f1]'} rounded-full`}
            >
              {isDropDownOpen ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </button>
        </div>
        {isDropDownOpen && (
          <ul className="ml-8 flex flex-col">
            {propertyTypeOption.propertyTypes.map((option) => (
              <li key={uuidv4()} className="w-full">
                <CheckboxItem
                  checked={localSelectedPropertyTypes.includes(option)}
                  label={option}
                  onChange={() => togglePropertyTypeSelection(option)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
