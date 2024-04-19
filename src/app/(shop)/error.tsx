'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import RestartIcon from '@/assets/restart.svg';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  console.log('error renders')
  return (
    <div className='grid place-items-center'>
      <div className='text-center space-y-8'>
        <h2>Hoppá, valahol elszakadt a eresztő zsinór!</h2>
        <button
          className="d-btn d-btn-outline d-btn-neutral"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          <RestartIcon className="h-6 w-6" />
          Próbáld újra
        </button>
      </div>
    </div>
  );
}
