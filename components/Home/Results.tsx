import { Card, CardFooter, CardHeader } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

const Results = () => {
  return (
    <section
      className='flex flex-col items-center w-full max-md:max-w-full bg-[#FFD6C5]'
      id='product'>
      <div className='self-center mt-20 text-5xl font-semibold text-gray-800 capitalize max-md:mt-10 max-md:max-w-full max-md:text-4xl'>
        Results of our clients
      </div>
      <div className='self-center px-5 mt-10 w-full max-w-screen-xl max-md:max-w-full mb-20'>
        <div className='flex gap-5 max-md:flex-col max-md:gap-0'>
          <div className='flex flex-col w-[33%] max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col grow py-0.5 max-md:mt-10'>
              <div className='w-full flex'>
                <Image
                  loading='lazy'
                  src='/images/problem1.png'
                  alt='Wrinkles'
                  width={384}
                  height={244}
                  className=' inset-0 size-full'
                />
              </div>
              <div className='flex gap-4 mt-5'>
                <div className='flex flex-col grow shrink-0 text-sm basis-0 w-fit'>
                  <div className='font-bold text-gray-800 whitespace-nowrap leading-[143%]'>
                    Leslie Alexander
                  </div>
                  <div className='mt-1 leading-5 text-zinc-800'>
                    I recommend to everyone!! My skin has never looked better.
                    My Confidence came back 10 fold.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col grow py-0.5 max-md:mt-10'>
              <div className='w-full flex'>
                <Image
                  loading='lazy'
                  src='/images/problem2.png'
                  alt='Wrinkles'
                  width={384}
                  height={244}
                  className=' inset-0 size-full'
                />
              </div>
              <div className='flex gap-4 mt-5'>
                <div className='flex flex-col grow shrink-0 text-sm basis-0 w-fit'>
                  <div className='font-bold text-gray-800 whitespace-nowrap leading-[143%]'>
                    Devon Lane
                  </div>
                  <div className='mt-1 leading-5 text-zinc-800'>
                    I recommend to everyone!! My skin has never looked better.
                    My Confidence came back 10 fold.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full'>
            <div className='flex flex-col grow py-0.5 max-md:mt-10'>
              <div className='w-full flex'>
                <Image
                  loading='lazy'
                  src='/images/problem3.png'
                  alt='Wrinkles'
                  width={384}
                  height={244}
                  className=' inset-0 size-full'
                />
              </div>
              <div className='flex gap-4 mt-5'>
                <div className='flex flex-col grow shrink-0 text-sm basis-0 w-fit'>
                  <div className='font-bold text-gray-800 whitespace-nowrap leading-[143%]'>
                    Jane Cooper
                  </div>
                  <div className='mt-1 leading-5 text-zinc-800'>
                    I recommend to everyone!! My skin has never looked better.
                    My Confidence came back 10 fold.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
