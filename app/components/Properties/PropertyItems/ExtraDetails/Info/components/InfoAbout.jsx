import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function InfoAbout({ extraDetails, title }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showAllInfo, setShowAllInfo] = useState(false);

  // Function to generate a random phone number
  const generatePhoneNumber = () => {
    const areaCode = Math.floor(600 + Math.random() * 100); // Generates a number between 600-699
    const firstPart = Math.floor(100 + Math.random() * 900); // Generates a number between 100-999
    const secondPart = Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000-9999

    return `+971 4 ${areaCode} ${firstPart} ${secondPart}`;
  };

  useEffect(() => {
    // Generate the phone number only once when the component mounts
    setPhoneNumber(generatePhoneNumber());
  }, []);

  // Toggle the "show all info" state
  const toggleInfo = () => {
    setShowAllInfo((prev) => !prev);
  };

  return (
    <>
      <section className="flex flex-col items-start gap-4 rounded-lg border p-3">
        <h2 className="text-[20px] font-bold">About {title}</h2>

        {/* About */}
        <div className="relative">
          <p className={`text-[14px] ${!showAllInfo ? 'line-clamp-3' : ''}`}>
            {extraDetails.info.about}
          </p>
          {!showAllInfo && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-7 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />
          )}
        </div>

        {showAllInfo && (
          <>
            {/* Arrival Departure */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[14px] font-bold">Arrival / Departure</h4>
              <ol className="list-none text-[14px]">
                <li>Check in: {extraDetails.info.checkIn}</li>
                <li>Check out: {extraDetails.info.checkOut}</li>
              </ol>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3 text-[14px]">
              <h4 className="font-bold">Contact</h4>
              <div className="flex flex-col">
                <address className="not-italic">
                  {extraDetails.info.propertyAddress}
                </address>
                <span className="">
                  Telephone: {phoneNumber} |{' '}
                  <a className="text-[#0079c2]" href="#">
                    Official site
                  </a>
                </span>
              </div>
            </div>

            {/* Represent property */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-bold">
                Represent this property?
              </h4>
              <button className="rounded-lg border border-[#6c6c6b] p-2 text-center text-[14px] font-bold hover:bg-[#6c6c6b] hover:text-white">
                Manage your profile
              </button>
            </div>
          </>
        )}

        <button
          className="flex items-center gap-1 text-[14px] font-bold text-[#2582c4]"
          onClick={toggleInfo}
        >
          {showAllInfo ? 'Show less info' : 'Show all info'}
          {showAllInfo ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </section>
    </>
  );
}
