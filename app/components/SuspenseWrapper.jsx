import { Spinner } from '@heroui/react';
import { Suspense } from 'react';

export default function SuspenseWrapper({ children }) {
  return (
    <Suspense
      fallback={
        <div className="grid h-screen place-items-center">
          <Spinner />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
