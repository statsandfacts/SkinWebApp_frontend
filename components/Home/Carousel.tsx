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
export default function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps',
    },
    [Autoplay({ delay: 3000 })]
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
            <div className='flex flex-col grow py-0.5 max-md:mt-10 px-10'>
              <div className='w-full flex justify-center items-center'>
                <Image
                  loading='lazy'
                  src='/images/review1.png'
                  alt='Wrinkles'
                  width={384}
                  height={244}
                  className=' inset-0 size-full'
                />
              </div>
              <div className='flex gap-4 mt-5'>
                <div className='flex flex-col grow shrink-0 text-sm basis-0 w-fit items-center'>
                  <div className='font-bold text-gray-800 whitespace-nowrap leading-[143%]'>
                    Aditi
                  </div>
                  <div className='mt-1 leading-5 text-zinc-800 w-1/2 '>
                    This powerful serum visibly reduced my fine lines and
                    wrinkles within a few weeks. However, it can be drying, so a
                    good moisturizer is essential. Also, be sure to wear
                    sunscreen every day, as retinol increases sun sensitivity.
                    4.5 out of 5 stars
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='embla__slide'>
            <div className='flex flex-col grow py-0.5 max-md:mt-10 px-10'>
              <div className='w-full flex justify-center items-center'>
                <Image
                  loading='lazy'
                  src='/images/review2.png'
                  alt='Wrinkles'
                  width={384}
                  height={244}
                  className=' inset-0 size-full'
                />
              </div>
              <div className='flex gap-4 mt-5'>
                <div className='flex flex-col grow shrink-0 text-sm basis-0 w-fit items-center'>
                  <div className='font-bold text-gray-800 whitespace-nowrap leading-[143%]'>
                    Shivani
                  </div>
                  <div className='mt-1 leading-5 text-zinc-800 w-1/2'>
                    This fragrance-free cleanser is a dream for sensitive skin.
                    It removes makeup without irritation and leaves my face
                    feeling clean and soft. However, for those with oily skin,
                    it might not be mattifying enough. 4 out of 5 stars.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='embla__slide'>
            <div className='flex flex-col grow py-0.5 max-md:mt-10 px-10'>
              <div className='w-full flex justify-center items-center'>
                <Image
                  loading='lazy'
                  src='/images/review3.png'
                  alt='Wrinkles'
                  width={384}
                  height={244}
                  className=' inset-0 size-full'
                />
              </div>
              <div className='flex gap-4 mt-5'>
                <div className='flex flex-col grow shrink-0 text-sm basis-0 w-fit items-center'>
                  <div className='font-bold text-gray-800 whitespace-nowrap leading-[143%]'>
                    Shakshi
                  </div>
                  <div className='mt-1 leading-5 text-zinc-800 w-1/2'>
                    I use this mask once a week for a brighter, more even
                    complexion. It tingles slightly, but that subsides quickly.
                    The results are noticeable, but temporary. 4 out of 5 stars
                    (great for a pre-event glow).
                  </div>
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
}
