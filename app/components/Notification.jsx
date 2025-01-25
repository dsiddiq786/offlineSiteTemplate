import { TfiBell } from 'react-icons/tfi';

const Notification = () => {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
      <TfiBell className="text-2xl text-[#ffc99c]" />
      <p className="text-[12px]">
        The prices and availability we receive from booking sites change
        constantly. This means you may not always find the exact same offer you
        saw on trivago when you land on the booking site.
      </p>
    </div>
  );
};

export default Notification;
