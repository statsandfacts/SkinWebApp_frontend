'use client';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import React from 'react';

const TitleHeader = ({
  title,
  desc,
  isBack,
  isMobileBack,
}: {
  title: string;
  desc: string;
  isBack: boolean;
  isMobileBack?: boolean;
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div className=''>
      <div className='flex items-center gap-2'>
        {isBack && (
          <button onClick={handleBack}>
            <ArrowLeftIcon width={20} />
          </button>
        )}

        {isMobileBack && (
          <button className='md:hidden' onClick={handleBack}>
            <ArrowLeftIcon width={20} />
          </button>
        )}
        <h1 className='text-lg font-bold text-black'>{title}</h1>
      </div>
      <span className='text-xs'>{desc}</span>
    </div>
  );
};

export default TitleHeader;
