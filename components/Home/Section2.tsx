import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ClientButton from '../ClientButton';
import Partners from './Partners';

const Section2 = () => {
  return (
    <>
      <div
        className='flex flex-col p-20 w-full max-md:px-5 max-md:max-w-full'
        id='about'>
        <div className='self-center mt-4 text-xl text-center text-gray-800 whitespace-nowrap'>
          face and body skincare
        </div>
        <div className='self-center mt-2 text-5xl font-semibold text-gray-800 max-md:max-w-full max-md:text-4xl'>
          Our dermatology providers can treat
        </div>
        <div className='flex flex-col justify-center self-center px-10 mt-10 max-w-full text-base font-medium text-center whitespace-nowrap rounded-2xl text-zinc-800 w-[873px] max-md:px-5'>
          <div className='flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full'>
            <div className='flex flex-col basis-0'>
              <Image
                loading='lazy'
                src='/icons/acne.svg'
                className='self-center aspect-[1.28] w-[41px]'
                alt='acne'
                width={41}
                height={41}
              />
              <div className='mt-4'>Acne</div>
            </div>
            <div className='flex flex-col flex-1'>
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d70e2914ad7e699d83ac6b06e71a3334e7297955c2d61cb94410ce1d7146113?apiKey=15e1f2d0851f47fb85d5e15de811adcf&"
                className="self-center w-8 aspect-square"
              /> */}
              <Image
                loading='lazy'
                src='/icons/Clogged.svg'
                className='self-center aspect-[1.28] w-[41px]'
                alt='Clogged pores'
                width={41}
                height={41}
              />
              <div className='mt-4'>Clogged pores</div>
            </div>
            <div className='flex flex-col flex-1'>
              <Image
                loading='lazy'
                src='/icons/dark-sports.svg'
                className='self-center aspect-[1.28] w-[41px]'
                alt='Dark sports'
                width={41}
                height={41}
              />
              <div className='mt-4'>Dark sports</div>
            </div>
            <div className='flex flex-col flex-1'>
              <Image
                loading='lazy'
                src='/icons/fine-lines.svg'
                className='self-center aspect-[1.28] w-[41px]'
                alt='Fine lines'
                width={41}
                height={41}
              />
              <div className='mt-4'>Fine lines</div>
            </div>
            <div className='flex flex-col flex-1'>
              <Image
                loading='lazy'
                src='/icons/Rosacea.svg'
                className='self-center aspect-[1.28] w-[41px]'
                alt='Rosacea'
                width={41}
                height={41}
              />
              <div className='mt-4'>Rosacea</div>
            </div>
            <div className='flex flex-col flex-1'>
              <Image
                loading='lazy'
                src='/icons/Wrinkles.svg'
                className='self-center aspect-[1.28] w-[41px]'
                alt='Wrinkles'
                width={41}
                height={41}
              />
              <div className='mt-4'>Wrinkles</div>
            </div>
          </div>
        </div>
        <div className='mt-12 rounded-2xl max-md:mt-10 max-md:max-w-full'>
          <div className='flex gap-5 max-md:flex-col max-md:gap-0'>
            <div className='mt-3 flex flex-col w-full md:w-3/12 max-md:ml-0 max-md:w-full'>
              <Image
                loading='lazy'
                src='/images/treat-1.png'
                alt='treat'
                width={317}
                height={300}
                className='w-full'
              />
            </div>
            <div className='mt-3 flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full'>
              <Image
                loading='lazy'
                src='/images/treat-2.png'
                alt='treat'
                width={317}
                height={300}
                className='w-full'
              />
            </div>
            <div className='mt-3 flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full'>
              <Image
                loading='lazy'
                src='/images/treat-3.png'
                alt='treat'
                width={317}
                height={300}
                className='w-full'
              />
            </div>
            <div className='mt-3 flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full'>
              <Image
                loading='lazy'
                src='/images/treat-4.png'
                alt='treat'
                width={317}
                height={300}
                className='w-full'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center px-16 py-14 mt-10 text-gray-800 bg-purple-100 rounded-2xl max-md:px-5 max-md:max-w-full'>
          <div className='text-5xl font-semibold whitespace-nowrap max-md:text-4xl'>
            How it works
          </div>
          <div className='flex gap-5 justify-between items-start self-stretch px-20 mt-12 text-center max-md:flex-wrap max-md:px-5 max-md:mt-10'>
            <div className='flex flex-col flex-1 items-center whitespace-nowrap'>
              <Image
                loading='lazy'
                src='/images/step-1.png'
                alt='steps'
                width={200}
                height={200}
              />
              <div className='mt-4 text-xl font-semibold'>Step 1</div>
              <div className='self-stretch mt-1 text-sm'>Tell us about you</div>
            </div>
            <div className='flex flex-col flex-1 items-center whitespace-nowrap'>
              <Image
                loading='lazy'
                src='/images/step-2.png'
                alt='steps'
                width={200}
                height={200}
              />
              <div className='mt-4 text-xl font-semibold'>Step 2</div>
              <div className='self-stretch mt-1 text-sm'>
                Upload your picture
              </div>
            </div>
            <div className='flex flex-col flex-1 items-center self-stretch'>
              <Image
                loading='lazy'
                src='/images/step-3.png'
                alt='steps'
                width={200}
                height={200}
              />
              <div className='mt-4 text-xl font-semibold whitespace-nowrap'>
                Step 3
              </div>
              <div className='self-stretch mt-1 text-sm'>
                Dermatologist review your case
              </div>
            </div>
            <div className='flex flex-col flex-1 items-center whitespace-nowrap'>
              <Image
                loading='lazy'
                src='/images/step-4.png'
                alt='steps'
                width={200}
                height={200}
              />
              <div className='mt-4 text-xl font-semibold'>Step 4</div>
              <div className='self-stretch mt-1 text-sm'>
                Personalised prescription
              </div>
            </div>
            <div className='flex flex-col flex-1 items-center self-stretch'>
              <Image
                loading='lazy'
                src='/images/step-5.png'
                alt='steps'
                width={200}
                height={200}
              />
              <div className='mt-4 text-xl font-semibold whitespace-nowrap'>
                Step 5
              </div>
              <div className='self-stretch mt-1 text-sm'>
                Recommend skin care products
              </div>
            </div>
          </div>

          <ClientButton
            path='/treatment'
            title='Find Your Treatment'
            className='justify-center self-center px-8 py-6 mt-8 text-lg font-medium text-white whitespace-nowrap bg-violet-600 shadow rounded-[96.709px] max-md:px-5'
          />
        </div>
        <Partners />
      </div>
    </>
  );
};

export default Section2;
