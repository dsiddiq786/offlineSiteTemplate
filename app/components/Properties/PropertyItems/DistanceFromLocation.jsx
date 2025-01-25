export default function DistanceFromLocation({ location }) {
  return (
    <div className="py-[2px] hover:bg-[#f2f2f1]" role="button">
      <span className="text-[14px]">{location}</span>
    </div>
  );
}
