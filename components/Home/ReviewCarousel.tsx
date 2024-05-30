'use client';
import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import Image from 'next/image';

const ReviewCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps',
    }
    // [Autoplay({ delay: 3000 })]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.slideNodes(); // Access API
    }
  }, [emblaApi]);

  return (
    <section className='p-10 overflow-hidden max-w-[90%] md:max-w-full'>
      <div className='embla' ref={emblaRef}>
        <div className='embla__container'>
          <div className='embla__slide'>
            <div className='flex flex-wrap -m-4'>
              <div className='p-4 md:w-1/2 w-full'>
                <div className='h-full p-8 rounded'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    className='block w-5 h-5 text-gray-400 mb-4'
                    viewBox='0 0 975.036 975.036'>
                    <path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
                  </svg>
                  <p className='leading-relaxed mb-6'>
                    This moisturizer is a game-changer! My skin feels so soft
                    and hydrated. I love how quickly it absorbs without feeling
                    greasy. Highly recommend!
                  </p>
                  <a className='relative inline-flex items-center w-20 h-20'>
                    <Image
                      alt='testimonial'
                      src='/images/review-1.jpg'
                      fill
                      className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
                    />
                  </a>
                  <span className='flex-grow flex flex-col'>
                    <span className='title-font font-medium text-gray-900'>
                      Emily J.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='embla__slide'>
            <div className='flex flex-wrap -m-4'>
              <div className='p-4 md:w-1/2 w-full'>
                <div className='h-full p-8 rounded'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    className='block w-5 h-5 text-gray-400 mb-4'
                    viewBox='0 0 975.036 975.036'>
                    <path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
                  </svg>
                  <p className='leading-relaxed mb-6'>
                    I&apos;ve struggled with acne for years, but this cleanser
                    has made a huge difference. My skin is clearer and less
                    irritated. It&apos;s now a staple in my routine.
                  </p>
                  <a className='relative inline-flex items-center w-20 h-20 w-20 h-20'>
                    <Image
                      alt='testimonial'
                      src='/images/review-2.avif'
                      fill
                      className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
                    />
                  </a>
                  <span className='flex-grow flex flex-col'>
                    <span className='title-font font-medium text-gray-900'>
                      David R.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='embla__slide'>
            <div className='flex flex-wrap -m-4'>
              <div className='p-4 md:w-1/2 w-full'>
                <div className='h-full p-8 rounded'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    className='block w-5 h-5 text-gray-400 mb-4'
                    viewBox='0 0 975.036 975.036'>
                    <path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
                  </svg>
                  <p className='leading-relaxed mb-6'>
                    The serum is fantastic! It brightened my complexion and
                    reduced my dark spots in just a few weeks. My skin looks
                    healthier and more radiant. Absolutely love it!
                  </p>
                  <a className='relative inline-flex items-center w-20 h-20'>
                    <Image
                      alt='testimonial'
                      src='/images/review-3.jpg'
                      fill
                      className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
                    />
                  </a>
                  <span className='flex-grow flex flex-col'>
                    <span className='title-font font-medium text-gray-900'>
                      Samantha K.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='embla__slide'>
            <div className='flex flex-wrap -m-4'>
              <div className='p-4 md:w-1/2 w-full'>
                <div className='h-full p-8 rounded'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    className='block w-5 h-5 text-gray-400 mb-4'
                    viewBox='0 0 975.036 975.036'>
                    <path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
                  </svg>
                  <p className='leading-relaxed mb-6'>
                    This sunscreen is perfect for daily use. It doesn&apos;t
                    leave a white cast and feels light on my skin. Finally found
                    a sunscreen that works for my sensitive skin.
                  </p>
                  <a className='relative inline-flex items-center w-20 h-20'>
                    <Image
                      alt='testimonial'
                      src='/images/review-4.jpg'
                      fill
                      className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
                    />
                  </a>
                  <span className='flex-grow flex flex-col'>
                    <span className='title-font font-medium text-gray-900'>
                      L. Menon
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='embla__slide'>
            <div className='flex flex-wrap -m-4'>
              <div className='p-4 md:w-1/2 w-full'>
                <div className='h-full p-8 rounded'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    className='block w-5 h-5 text-gray-400 mb-4'
                    viewBox='0 0 975.036 975.036'>
                    <path d='M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z'></path>
                  </svg>
                  <p className='leading-relaxed mb-6'>
                    The night cream is amazing! I wake up with smooth, plump
                    skin every morning. It&apos;s helped reduce fine lines and
                    keeps my skin moisturized all night. So impressed!
                  </p>

                  <a className='relative inline-flex items-center w-20 h-20'>
                    <Image
                      alt='testimonial'
                      src='/images/review-5.webp'
                      fill
                      className='w-12 h-12 rounded-full flex-shrink-0 object-cover object-center'
                    />
                  </a>
                  <span className='flex-grow flex flex-col'>
                    <span className='title-font font-medium text-gray-900'>
                      Jessica M.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='embla__controls'>
        <div className='embla__buttons'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className='embla__dots'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
