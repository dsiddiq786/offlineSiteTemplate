export default function Photos({ images }) {
  return (
    <div className="flex flex-col items-center space-y-2 p-4">
      {/* First Row: 4 Images */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="relative h-[154px] overflow-hidden">
            <img
              alt={`Gallery ${index + 1}`}
              className="h-full w-full object-cover"
              loading="lazy"
              src={image}
            />
          </div>
        ))}
      </div>

      {/* Second Row: 3 Images with Greater Height */}
      <div className="grid grid-cols-3 gap-2">
        {images.slice(4, 7).map((image, index) => (
          <div key={index} className="relative h-[207px] overflow-hidden">
            <img
              alt={`Gallery ${index + 5}`}
              className="h-full w-full object-cover"
              loading="lazy"
              src={image}
            />
          </div>
        ))}
      </div>

      {/* Third Row: 4 Images */}
      <div className="grid grid-cols-2 items-center gap-2 md:grid-cols-4">
        {images.slice(7, 11).map((image, index) => (
          <div key={index} className="relative h-[154px] overflow-hidden">
            <img
              alt={`Gallery ${index + 8}`}
              className="h-full w-full object-cover"
              loading="lazy"
              src={image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
