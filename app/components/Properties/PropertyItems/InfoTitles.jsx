export default function InfoTitles({ extraDetails }) {
  // Get property details from the JSON
  const propertyDetails = extraDetails?.info?.propertyDetails || [];

  // Function to get two random property details
  const getRandomPropertyDetails = (details) => {
    if (details.length === 0) return [];
    if (details.length <= 2) return details; // If less than 2, return all

    return details.slice(0, 2); // Select first two
  };

  const randomDetails = getRandomPropertyDetails(propertyDetails);

  return (
    <>
      {/* Show Property Details if available */}
      {randomDetails.length > 0 && (
        <div className="flex py-[2px] hover:bg-[#f2f2f1]" role="button">
          {randomDetails.map((detail, index) => (
            <span key={index} className="text-[14px]">
              {detail.title}
              {index !== randomDetails.length - 1 ? ' , ' : ''}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
