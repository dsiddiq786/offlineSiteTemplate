import { FaCheck } from 'react-icons/fa6';

export default function CheckboxItem({ label, checked, onChange }) {
  return (
    <label className="flex w-full cursor-pointer items-center gap-3 rounded-lg py-2 pl-2 hover:bg-[#f2f2f1]">
      {/* Checkbox container */}
      <div
        className={`flex h-5 w-5 items-center justify-center rounded border ${
          checked ? 'border-blue-600 bg-blue-600' : 'bg-white'
        }`}
      >
        {checked && <FaCheck className="font-bold text-white" />}
      </div>

      {/* Label */}
      <span className="text-[14px]">{label}</span>

      {/* Hidden checkbox input */}
      <input
        checked={checked}
        className="hidden"
        type="checkbox"
        onChange={onChange}
      />
    </label>
  );
}
