import Image from 'next/image';
import React from 'react';
import EmblaCarousel from './Carousel';

const Results = () => {
  return (
    <section
      className='flex flex-col items-center w-full max-md:max-w-full bg-[#FFD6C5]'
      id='product'>
      <div className='self-center mt-20 text-5xl font-semibold text-gray-800 capitalize max-md:mt-10 max-md:max-w-full max-md:text-4xl'>
        Results
      </div>

      <EmblaCarousel />
    </section>
  );
};

export default Results;
