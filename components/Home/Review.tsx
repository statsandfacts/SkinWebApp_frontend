import React from 'react';
import ReviewCarousel from './ReviewCarousel';
const Review = () => {
  return (
    <>
      <section
        className='flex flex-col items-center w-full max-md:max-w-full'
        id='product'>
        <div className='self-center text-center mt-20 text-5xl font-semibold text-gray-800 capitalize max-md:mt-10 max-md:max-w-full max-md:text-4xl'>
          Testimonials
        </div>

        <ReviewCarousel />
      </section>
    </>
  );
};

export default Review;
