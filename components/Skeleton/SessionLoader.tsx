import { Skeleton } from '@nextui-org/react';
import React from 'react';

const SessionLoader = () => {
  return (
    <>
      <div className='w-full space-y-5 p-4 shadow-none'>
        <div className='w-full flex items-center gap-3 justify-around'>
          <div className='w-full flex flex-col gap-2'>
            <Skeleton className='h-3 w-3/5 rounded-lg' />
            <Skeleton className='h-3 w-4/5 rounded-lg' />
            <Skeleton className='h-3 w-4/5 rounded-lg' />
          </div>
          <div>
            <Skeleton className='flex rounded-full w-28 h-12' />
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionLoader;
