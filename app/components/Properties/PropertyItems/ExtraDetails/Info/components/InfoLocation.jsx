import { RiExpandDiagonalLine } from 'react-icons/ri';

export default function InfoLocation({ extraDetails, lowestPrice }) {
  return (
    <>
      <div className="flex flex-col items-start gap-2 rounded-lg border p-3">
        <h2 className="text-[20px] font-bold">Location</h2>

        <ul className="list-none">
          <li className="text-[14px]">{extraDetails.info.propertyAddress}</li>
        </ul>

        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <img
            alt="google-map"
            className="h-full w-full rounded-lg object-cover"
            loading="lazy"
            src="/images/google-map.png"
          />

          <div className="absolute right-2 top-2">
            <button className="rounded-lg bg-white p-2 shadow-md shadow-gray-500">
              <RiExpandDiagonalLine className="text-xl" />
            </button>
          </div>

          <div className="absolute bottom-1/2 left-1/2 top-1/2">
            <span className="rounded-full border border-white bg-[#171717] px-[6px] py-[2px] text-[14px] font-bold text-white shadow-md shadow-gray-500">
              ${lowestPrice.price}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
