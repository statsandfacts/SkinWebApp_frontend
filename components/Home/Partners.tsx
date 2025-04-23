import { Card, CardBody, CardFooter } from "@heroui/react";
import Image from 'next/image';
import React from 'react';

const Partners = () => {
  return (
    <>
      <div className='flex flex-col items-center px-16 pt-10 mt-10 mb-4 max-md:px-5 max-md:max-w-full'>
        <div className='flex flex-col max-w-full '>
          <div className='self-center text-3xl font-semibold text-gray-800 capitalize whitespace-nowrap'>
            Our product partners
          </div>
          <div className='mt-10 w-full'>
            <div className='flex flex-wrap gap-5 w-full justify-center'>
              <div className=''>
                <Image
                  loading='lazy'
                  src='/images/partners1.png'
                  className='grow shrink-0 max-w-full border border-solid aspect-[1.01] border-zinc-300 w-[142px] max-md:mt-6'
                  alt='clipla'
                  width={100}
                  height={200}
                />
              </div>
              <div className='w-40'>
                <Image
                  loading='lazy'
                  src='/images/partners2.png'
                  className='grow shrink-0 max-w-full border border-solid aspect-[1.01] border-zinc-300 w-[142px] max-md:mt-6'
                  alt='sunFrame'
                  width={100}
                  height={200}
                />
              </div>
              <div className='w-40'>
                <Image
                  loading='lazy'
                  src='/images/partners3.png'
                  className='grow shrink-0 max-w-full border border-solid aspect-[1.01] border-zinc-300 w-[142px] max-md:mt-6'
                  alt='sunFrame'
                  width={100}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
