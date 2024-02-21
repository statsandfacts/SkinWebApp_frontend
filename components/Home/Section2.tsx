import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Section2 = () => {
  return (
    <>
      <div className='flex flex-col self-stretch px-16 text-6xl py-11 w-full font-bold text-white bg-violet-500 max-md:px-5 max-md:mt-10 max-md:max-w-full max-md:text-4xl'>
        <div className='mx-10 mt-6 w-full'>
          Our dermatology providers can treat
        </div>
        <div className='flex overflow-hidden relative flex-col items-center px-16 pt-12 mt-12 w-full text-2xl text-center whitespace-nowrap min-h-[485px] text-zinc-800 max-md:px-5 max-md:mt-10 max-md:max-w-full'>
          <Image
            loading='lazy'
            src='/images/section1.png'
            className='object-cover inset-0 size-full w-full h-full'
            fill
            alt='section1'
          />
          <div className='flex text-lg font-normal relative gap-5 justify-between items-start px-8 pt-3 pb-1.5 mt-80 bg-red-200 max-md:flex-wrap max-md:px-5 max-md:mt-10 max-md:max-w-full'>
            <Link href='#'>
              <div className='flex flex-col basis-0'>
                <Image
                  loading='lazy'
                  src='/icons/acne.svg'
                  alt='acne'
                  className='self-center aspect-[1.22] w-[50px]'
                  width={50}
                  height={50}
                />
                <div className='mt-4'>Acne</div>
              </div>
            </Link>
            <Link href='#'>
              <div className='flex flex-col flex-1 mt-1'>
                <Image
                  loading='lazy'
                  src='/icons/Clogged.svg'
                  className='self-center aspect-[1.09] w-[37px]'
                  width={50}
                  height={50}
                  alt='clogged'
                />
                <div className='mt-5'>Clogged pores</div>
              </div>
            </Link>
            <Link href='#'>
              <div className='flex flex-col flex-1'>
                <Image
                  loading='lazy'
                  src='/icons/dark-sports.svg'
                  className='self-center w-9 aspect-[1.03]'
                  width={50}
                  height={50}
                  alt='dark-sports'
                />
                <div className='mt-5'>Dark sports</div>
              </div>
            </Link>
            <Link href='#'>
              <div className='flex flex-col flex-1'>
                <Image
                  loading='lazy'
                  src='/icons/fine-lines.svg'
                  className='self-center w-9 aspect-square'
                  width={50}
                  height={50}
                  alt='fine-lines'
                />
                <div className='mt-5'>Fine lines</div>
              </div>
            </Link>

            <Link href='#'>
              <div className='flex flex-col flex-1 mt-1'>
                <Image
                  loading='lazy'
                  src='/icons/Rosacea.svg'
                  className='self-center aspect-[1.06] w-[35px]'
                  width={50}
                  height={50}
                  alt='Rosacea'
                />
                <div className='mt-5'>Rosacea</div>
              </div>
            </Link>
            <Link href='#'>
              <div className='flex flex-col flex-1'>
                <Image
                  loading='lazy'
                  src='/icons/Wrinkles.svg'
                  className='self-center aspect-[0.94] w-[35px]'
                  width={50}
                  height={50}
                  alt='Wrinkles'
                />
                <div className='mt-5'>Wrinkles</div>
              </div>
            </Link>
          </div>
        </div>
        <div className='self-center mt-7 text-center max-md:max-w-full max-md:text-4xl'>
          Face and body skincare
        </div>
      </div>
    </>
  );
};

export default Section2;
