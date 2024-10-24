'use client'; // Error components must be Client Components

import { useEffect } from 'react';

import RestartIcon from '~/assets/restart.svg';
import { useToastStore } from '~/store/use-toast-store';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const toast = useToastStore((state) => state.toast);

  useEffect(() => {
    toast({
      message: error.message,
      type: 'error',
      id: error.name,
    });

    console.error(error)
  }, [error]);

  return (
    <div className="grid place-items-center">
      <div className="space-y-8 text-center">
        <h2>Hoppá, valahol elszakadt a eresztő zsinór!</h2>
        <button
          className="d-btn d-btn-outline d-btn-neutral"
          onClick={() => reset()}
        >
          <RestartIcon className="h-6 w-6" />
          Próbáld újra
        </button>
      </div>
    </div>
  );
}
