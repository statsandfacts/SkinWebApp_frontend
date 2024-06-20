import Image from 'next/image';
// import Link from 'next/link';
import React from 'react';
// import ClientButton from '../ClientButton';
// import Partners from './Partners';
import HowItsWorks from './HowItsWorks';

const Section2 = () => {
  return (
    <>
      <div
        className='flex flex-col p-20 w-full max-md:px-5 max-md:max-w-full'
        id='about'>
        <div className='self-center mt-4 text-[1.7rem] text-center text-gray-800 whitespace-nowrap'>
          Face and Body Skin Care
        </div>
        <div className='self-center mt-2 text-5xl text-center font-semibold text-gray-800 max-md:max-w-full max-md:text-4xl'>
          Our Dermatologist can treat
        </div>

        <div className='mt-12 rounded-2xl max-md:mt-10 max-md:max-w-full flex justify-center'>
          <div className='flex gap-5 max-md:flex-col max-md:gap-0'>
            <div className='relative overflow-hidden bg-cover bg-no-repeat max-h-72 w-[300px] h-[300px] mt-3 rounded-lg'>
              <Image
                loading='lazy'
                src='/images/treat-1.png'
                alt='treat'
                fill
                className='w-full h-full transition duration-300 ease-in-out hover:scale-110'
              />
            </div>
            <div className='relative overflow-hidden bg-cover bg-no-repeat max-h-72 w-[300px] h-[300px] mt-3 rounded-lg'>
              <Image
                loading='lazy'
                src='/images/treat-2.jpg'
                alt='treat'
                fill
                className='w-full h-full transition duration-300 ease-in-out hover:scale-110 '
              />
            </div>
            <div className='relative overflow-hidden bg-cover bg-no-repeat max-h-72 w-[300px] h-[300px]  mt-3 rounded-lg'>
              <Image
                loading='lazy'
                src='/images/treat-3.png'
                alt='treat'
                fill
                className='w-full h-full transition duration-300 ease-in-out hover:scale-110'
              />
            </div>
            <div className='relative overflow-hidden bg-cover bg-no-repeat max-h-72 w-[300px] h-[300px] mt-3  rounded-lg'>
              <Image
                loading='lazy'
                src='/images/treat-4.png'
                alt='treat'
                fill
                className='w-full h-full transition duration-300 ease-in-out hover:scale-110'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center self-center px-10 mt-10 max-w-full text-base font-medium text-center whitespace-nowrap rounded-2xl text-zinc-800 w-[873px] max-md:px-5'>
          <div className='flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full'>
            <div className='flex flex-col flex-1 min-w-[100px]'>
              <Image
                loading='lazy'
                src='/images/acne.png'
                className='self-center aspect-[1.28] w-[41px]'
                alt='acne'
                width={41}
                height={41}
              />
              <div className='mt-4'>Acne</div>
            </div>
            <div className='flex flex-col flex-1 min-w-[100px]'>
              <Image
                loading='lazy'
                src='/images/c_pores.png'
                className='self-center aspect-[1.28] w-[41px]'
                alt='Clogged pores'
                width={41}
                height={41}
              />
              <div className='mt-4'>Clogged pores</div>
            </div>
            <div className='flex flex-col flex-1 min-w-[100px]'>
              <Image
                loading='lazy'
                src='/images/dark_sports.png'
                className='self-center aspect-[1.28] w-[41px]'
                alt='Dark spots'
                width={41}
                height={41}
              />
              <div className='mt-4'>Dark spots</div>
            </div>
            <div className='flex flex-col flex-1 min-w-[100px]'>
              <Image
                loading='lazy'
                src='/images/fineLine.png'
                className='self-center aspect-[1.28] w-[41px]'
                alt='Fine lines'
                width={41}
                height={41}
              />
              <div className='mt-4'>Fine lines</div>
            </div>
            <div className='flex flex-col flex-1 min-w-[100px]'>
              <Image
                loading='lazy'
                src='/images/tineo.png'
                className='self-center aspect-[1.28] w-[41px]'
                alt='tineo'
                width={41}
                height={41}
              />
              <div className='mt-4'>Tinea</div>
            </div>
            <div className='flex flex-col flex-1 min-w-[100px]'>
              <Image
                loading='lazy'
                src='/images/psorisis.png'
                className='self-center aspect-[1.28] w-[41px]'
                alt='Wrinkles'
                width={41}
                height={41}
              />
              <div className='mt-4'>Psoriasis</div>
            </div>
          </div>
        </div>
        <HowItsWorks />
        {/* <Partners /> */}
      </div>
    </>
  );
};

export default Section2;
