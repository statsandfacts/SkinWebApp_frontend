import { Card, CardFooter, CardHeader } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

const Section3 = () => {
  return (
    <div className='w-full px-16 bg-red-200 flex flex-col items-center justify-center py-14'>
      <div className='text-6xl font-bold text-zinc-800'>How it works</div>
      <div className='mt-10 text-2xl font-bold text-center text-black'>
        <div className='flex gap-4 flex-1 flex-wrap items-center justify-center'>
          {/* <Card
            isFooterBlurred
            className='w-[250px] h-[300px] col-span-12 sm:col-span-7  hover:translate-y-5'>
            <Image
              removeWrapper
              alt='Relaxing app background'
              className='z-0 w-full h-full object-cover'
              src='/images/client-1.png'
              width={250}
              height={250}
            />
            <CardFooter className='absolute bg-red-200/60 bottom-0 h-16 z-10 border-t-1 border-default-600 dark:border-default-100'>
              <div className='flex flex-grow gap-2 items-center justify-center'>
                <div className='flex flex-col '>
                  <p className='text-base font-normal text-black'>
                    Tell us about you
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card> */}

          <Card
            isFooterBlurred
            className='w-[250px] h-[300px] col-span-12 sm:col-span-7  hover:translate-y-5'>
            <Image

              alt='Relaxing app background'
              className='z-0 w-full h-full object-cover'
              src='/images/client-2.png'
              width={250}
              height={250}
            />
            <CardFooter className='absolute bg-red-200/60 bottom-0 h-16 z-10 border-t-1 border-default-600 dark:border-default-100'>
              <div className='flex flex-grow gap-2 items-center justify-center'>
                <div className='flex flex-col '>
                  <p className='text-base font-normal text-black'>
                    Upload your images
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card
            isFooterBlurred
            className='w-[250px] h-[300px] col-span-12 sm:col-span-7 hover:translate-y-5'>
            <Image

              alt='Relaxing app background'
              className='z-0 w-full h-full object-cover'
              src='/images/client-3.png'
              width={250}
              height={250}
            />
            <CardFooter className='absolute bg-red-200/60 bottom-0 h-16 z-10 border-t-1 border-default-600 dark:border-default-100'>
              <div className='flex flex-grow gap-2 items-center justify-center'>
                <div className='flex flex-col '>
                  <p className='text-base font-normal text-black'>
                    Dermatologist review your case
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card
            isFooterBlurred
            className='w-[250px] h-[300px] col-span-12 sm:col-span-7 hover:translate-y-5'>
            <Image

              alt='Relaxing app background'
              className='z-0 w-full h-full object-cover'
              src='/images/client-4.png'
              width={250}
              height={250}
            />
            <CardFooter className='absolute bg-red-200/60 bottom-0 z-10 h-16 border-t-1 border-default-600 dark:border-default-100'>
              <div className='flex flex-grow gap-2 items-center justify-center'>
                <div className='flex flex-col '>
                  <p className='text-base font-normal text-black'>
                    Personalised prescription generate
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card
            isFooterBlurred
            className='w-[250px] h-[300px] col-span-12 sm:col-span-7 hover:translate-y-5'>
            <Image

              alt='Relaxing app background'
              className='z-0 w-full h-full object-cover'
              src='/images/client-5.png'
              width={250}
              height={250}
            />
            <CardFooter className='absolute bg-red-200/60 bottom-0 h-16 z-10 border-t-1 border-default-600 dark:border-default-100'>
              <div className='flex flex-grow gap-2 items-center justify-center'>
                <div className='flex flex-col '>
                  <p className='text-base font-normal text-black'>
                    Recommend skin care products
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Section3;
