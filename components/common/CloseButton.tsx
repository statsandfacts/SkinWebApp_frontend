'use client';
import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';

const CloseButton = () => {
  const gotoHome = () => {
    window.location.href = '/';
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
