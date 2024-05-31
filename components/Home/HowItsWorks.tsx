import React from 'react';
import ClientButton from '../ClientButton';
import Image from 'next/image';
import Link from 'next/link';

const HowItsWorks = () => {
  return (
    <>
      <div className='flex flex-col items-center px-16 py-14 mt-10 text-gray-800 bg-purple-100 rounded-2xl max-md:px-5 max-md:max-w-full'>
        <div className='text-5xl font-semibold whitespace-nowrap max-md:text-4xl'>
          How it works
        </div>
        <div className='flex gap-5 justify-center items-center flex-wrap max-md:max-w-full mt-10'>
          <div className='flex flex-col items-center justify-center'>
            <Image
              loading='lazy'
              src='/images/step-1.png'
              className='transition-transform duration-300 transform hover:scale-110 cursor-pointer'
              alt='steps'
              width={200}
              height={200}
            />
            <div className='mt-4 text-xl text-center font-semibold'>Step 1</div>
            <div className='self-stretch text-center mt-1 text-sm'>
              Tell us about you
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <Image
              loading='lazy'
              src='/images/step-2.png'
              className='transition-transform duration-300 transform hover:scale-110 cursor-pointer'
              alt='steps'
              width={200}
              height={200}
            />
            <div className='mt-4 text-xl text-center font-semibold'>Step 2</div>
            <div className='self-stretch mt-1 text-center text-sm'>
              Upload your picture
            </div>
          </div>
          <div className='flex flex-col items-center '>
            <Image
              loading='lazy'
              src='/images/step-3.png'
              className='transition-transform duration-300 transform hover:scale-110 cursor-pointer'
              alt='steps'
              width={200}
              height={200}
            />
            <div className='mt-4 text-xl text-center font-semibold whitespace-nowrap'>
              Step 3
            </div>
            <div className='self-stretch text-center mt-1 text-sm'>
              Dermatologist review your case
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <Image
              loading='lazy'
              src='/images/step-4.png'
              className='transition-transform duration-300 transform hover:scale-110 cursor-pointer'
              alt='steps'
              width={200}
              height={200}
            />
            <div className='mt-4 text-xl text-center font-semibold'>Step 4</div>
            <div className='self-stretch text-center mt-1 text-sm'>
              Get your Prescription
            </div>
          </div>
          {/* <div className='flex flex-col items-center'>
            <Image
              loading='lazy'
              src='/images/step-5.png'
              className='transition-transform duration-300 transform hover:scale-110 cursor-pointer'
              alt='steps'
              width={200}
              height={200}
            />
            <div className='mt-4 text-xl text-center font-semibold whitespace-nowrap'>
              Step 5
            </div>
            <div className='self-stretch  text-center mt-1 text-sm'>
              Recommend skin care products
            </div>
          </div> */}
        </div>

        <Link
          href='/treatment'
          className='justify-center self-center px-8 py-3 mt-8 text-lg font-medium text-white whitespace-nowrap bg-violet-600 shadow rounded-[96.709px] max-md:px-5'>
          Get Started
        </Link>
      </div>
    </>
  );
};

export default HowItsWorks;
