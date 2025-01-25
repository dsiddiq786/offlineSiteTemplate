import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';

const countries = [
  { code: 'us', name: 'USA' },
  { code: 'il', name: 'Israel (ישראל)' },
  { code: 'it', name: 'Italy (Italia)' },
  { code: 'jp', name: 'Japan (日本)' },
  { code: 'kr', name: 'Korea (한국)' },
  { code: 'my', name: 'Malaysia' },
  { code: 'mx', name: 'Mexico (México)' },
  { code: 'nl', name: 'Netherlands (Nederland)' },
  { code: 'nz', name: 'New Zealand' },
  { code: 'no', name: 'Norway (Norge)' },
  { code: 'pe', name: 'Peru (Perú)' },
  { code: 'ph', name: 'Philippines (Pilipinas)' },
  { code: 'pl', name: 'Poland (Polska)' },
  { code: 'pt', name: 'Portugal' },
  { code: 'ro', name: 'Romania (România)' },
  { code: 'rs', name: 'Serbia (Srbija)' },
  { code: 'sg', name: 'Singapore' },
  { code: 'sk', name: 'Slovakia (Slovensko)' },
  { code: 'si', name: 'Slovenia (Slovenija)' },
  { code: 'za', name: 'South Africa' },
  { code: 'es', name: 'Spain (España)' },
  { code: 'se', name: 'Sweden (Sverige)' },
  { code: 'ch', name: 'Switzerland (Schweiz)' },
  { code: 'tw', name: 'Taiwan (台灣)' },
  { code: 'th', name: 'Thailand (ประเทศไทย)' },
  { code: 'tr', name: 'Turkey (Türkiye)' },
  { code: 'ae', name: 'UAE' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'uy', name: 'Uruguay' },
  { code: 'vn', name: 'Vietnam (Việt Nam)' },
];

const CountrySelect = () => {
  const [selectedCountry, setSelectedCountry] = useState('us'); // Default USA

  return (
    <div className="relative flex w-64 items-center gap-2 rounded-lg border border-[#6c6c6b] p-2">
      {/* Display selected country flag */}
      <div className="">
        <img alt="" className="w-6" src={`/flags/${selectedCountry}.svg`} />
      </div>

      <select
        className="w-full appearance-none bg-transparent text-[14px] text-white"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      {/* Dropdown Arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white">
        <FaAngleDown />
      </div>
    </div>
  );
};

export default CountrySelect;
