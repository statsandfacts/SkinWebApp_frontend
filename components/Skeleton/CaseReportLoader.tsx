import {Skeleton} from "@heroui/skeleton";
import React from 'react';

const CaseReportLoader = () => {
  return (
    <>
      <div className='w-full space-y-5 p-4 shadow-none'>
        <div className='w-full flex items-center gap-3 justify-around'>
          <div className='w-full flex flex-col gap-2'>
            <Skeleton className='h-3 w-3/5 rounded-lg' />
            <Skeleton className='h-3 w-4/5 rounded-lg' />
            <Skeleton className='h-3 w-4/5 rounded-lg' />
          </div>
        </div>
        <div className='flex gap-3'>
          <Skeleton className='flex w-28 h-28' />
          <Skeleton className='flex w-28 h-28' />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <Skeleton className='h-3 w-3/5 rounded-lg' />
          <Skeleton className='h-3 w-4/5 rounded-lg' />
          <Skeleton className='h-3 w-4/5 rounded-lg' />
          <Skeleton className='h-3 w-4/5 rounded-lg' />
          <Skeleton className='h-3 w-4/5 rounded-lg' />
          <Skeleton className='h-3 w-4/5 rounded-lg' />
        </div>
      </div>
    </>
  );
};

export default CaseReportLoader;
