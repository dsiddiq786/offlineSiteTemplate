import { BsShare } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

export default function PropertiesTabs({
  tabs,
  selectedTab,
  setSelectedTab,
  handleDropDown,
}) {
  return (
    <div className="flex items-center justify-between border-y bg-white px-4">
      {/* Share Button */}
      <button className="flex items-center gap-2 text-[14px]">
        <BsShare />
        <span className="font-bold">Share</span>
      </button>

      {/* Tabs */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-3 py-4 text-sm font-bold hover:bg-[#f2f2f1] ${
              selectedTab === tab
                ? 'border-b border-[#2582c4] text-[#2582c4]'
                : ''
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Close Button */}
      <button
        className="flex items-center"
        onClick={() => handleDropDown(selectedTab)}
      >
        <RxCross2 className="text-xl" />
      </button>
    </div>
  );
}
