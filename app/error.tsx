'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='text-center mt-4'>
        <h1 className='mb-4 text-6xl font-semibold text-red-500'>
          We are under maintenance
        </h1>
        <p className='mb-4 text-lg text-gray-600'>we wil up soon</p>
        <div className='animate-bounce'>
          <svg
            className='mx-auto h-16 w-16 text-red-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'></path>
          </svg>
        </div>
        <p className='mt-4 text-gray-600'>
          <button onClick={reset} className='text-blue-500'>
            Refresh
          </button>
          <div>
            Let&apos;s get you back{' '}
            <a href='/' className='text-blue-500'>
              home
            </a>
            .
          </div>
        </p>
      </div>
    </div>
  );
}
