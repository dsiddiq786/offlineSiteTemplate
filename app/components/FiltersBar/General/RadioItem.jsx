export default function RadioItem({ label, value, checked, onChange, name }) {
  return (
    <label className="relative flex cursor-pointer items-center gap-3 rounded-lg p-2 text-[14px] hover:bg-[#f2f2f1]">
      <input
        checked={checked}
        className="h-5 w-5 appearance-none rounded-full border border-gray-300 bg-white checked:border-blue-600 checked:bg-blue-600"
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
      />
      <span className="absolute left-4 h-[4px] w-[4px] rounded-full bg-white" />
      <span>{label}</span>
    </label>
  );
}
