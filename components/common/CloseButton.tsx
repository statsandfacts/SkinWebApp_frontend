'use client';
import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useRouter } from 'next/navigation';

const CloseButton = () => {
  const router = useRouter();
  const gotoHome = () => {
    router.replace('/');
  };
  return (
    <>
      <div className='absolute w-full flex justify-end right-3 top-3'>
        <button onClick={gotoHome}>
          <XMarkIcon width={25} />
        </button>
      </div>
    </>
  );
};

export default CloseButton;
