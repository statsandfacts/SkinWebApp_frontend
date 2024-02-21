import Image from 'next/image';
import React from 'react';

const OurClients = () => {
  return <>
    <div className='w-full px-16 bg-red-200 flex flex-col items-center justify-center py-14'>
      <div className='text-6xl font-bold text-zinc-800'>Results of our clients</div>
      <div className='mt-10 text-2xl font-bold text-center text-black'>
        <div className='flex gap-4 flex-1 flex-wrap items-center justify-center'>
          <div className='relative'>
            <Image src={'/images/result-1.png'} width={250} height={250} className='w-80 h-64' alt='result-1' />
            <div className='mt-4'>
              <div className='text-base font-normal text-black'>
                <p>I recommend to everyone!!</p>
              </div>
            </div>
          </div>
          <div>
            <Image src={'/images/result-2.png'} width={250} height={250} alt='result-1' className='w-80 h-64' />
            <div className='mt-4'>
              <div className='text-base font-normal text-black'>
                <p>My skin has never looked better</p>
              </div>
            </div>
          </div>
          <div>
            <Image src={'/images/result-3.png'} width={250} height={250} alt='result-1' className='w-80 h-64' />
            <div className='mt-4'>
              <div className='text-base font-normal text-black'>
                <p>My Confidence came back 10 fold</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default OurClients;
