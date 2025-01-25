import { Chip } from '@heroui/react';
import { RxCross2 } from 'react-icons/rx';

export default function ChipItem({ title, onClose }) {
  return (
    <div className="flex gap-4">
      <Chip
        className
        classNames={{
          base: 'border-2 border-gray-600 flex items-center gap-2 p-1 bg-[#ecf4fd]',
          content: ' text-[14px]',
        }}
        endContent={<RxCross2 className="text-medium" />}
        variant="bordered"
        onClose={onClose}
      >
        {title}
      </Chip>
    </div>
  );
}
