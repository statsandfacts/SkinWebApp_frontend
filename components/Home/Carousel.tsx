'use client';
import React, { Fragment, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import Image from 'next/image';
import { COMMON } from '@/config/const';
export default function EmblaCarousel() {
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
    <section className='overflow-hidden max-w-[90%] md:max-w-full p-0 md:p-10 '>
      <div className='embla w-full' ref={emblaRef}>
        <div className='embla__container'>
          {COMMON.REVIEW_CAROUSEL_ITEMS.map((item, index) => (
            <div className='embla__slide' key={index}>
              <div className='flex flex-col grow py-0.5 max-md:mt-10 px-10'>
                <div className='w-full flex justify-center items-center'>
                  <Image
                    loading='lazy'
                    src={item.image}
                    alt='Wrinkles'
                    width={384}
                    height={244}
                    className=' inset-0 size-full'
                  />
                </div>
                <div className='flex gap-4 mt-5'>
                  <div className='flex flex-col grow shrink-0 text-sm basis-0 w-fit items-center'>
                    <div className='font-bold text-gray-800 whitespace-nowrap leading-[143%]'>
                      {item.name}
                    </div>
                    <div className='mt-1 leading-5 text-zinc-800 w-full md:w-1/2 '>
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='embla__controls'>
        <div className='embla__buttons'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className='embla__dots hidden md:flex'>
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
