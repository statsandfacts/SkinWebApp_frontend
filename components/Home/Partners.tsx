import { Card, CardBody, CardFooter } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

const Partners = () => {
  return (
    <>
      <div className='flex justify-center items-center self-stretch px-16 py-12 w-full bg-violet-500'>
        <div className='flex flex-col mt-4 mb-9 w-full max-w-[1122px] max-md:max-w-full'>
          <div className='self-center text-6xl font-bold text-white max-md:max-w-full max-md:text-4xl'>
            Our product partners
          </div>
          <div className='mt-16 max-md:mt-10 max-md:max-w-full'>
            <div className='flex gap-5 flex-wrap items-center justify-center'>
              <Card shadow='sm' isPressable className='bg-red-200/60'>
                <CardBody className='overflow-visible p-0'>
                  <Image
                    width={200}
                    height={200}
                    alt={'cilpla'}
                    className='w-full object-cover rounded-lg shadow-sm'
                    src='/images/clipla.png'
                  />
                </CardBody>
                <CardFooter className='text-xl font-bold flex  justify-center items-center'>
                  <p className='text-center text-black'>Cipla</p>
                </CardFooter>
              </Card>
              <Card shadow='sm' isPressable className='bg-red-200/60'>
                <CardBody className='overflow-visible p-0'>
                  <Image
                    width={200}
                    height={200}
                    alt={'manKind'}
                    className='w-full object-cover rounded-lg shadow-sm'
                    src='/images/manKind.png'
                  />
                </CardBody>
                <CardFooter className='text-xl font-bold flex  justify-center items-center'>
                  <p className='text-center text-black'>Man Kind</p>
                </CardFooter>
              </Card>
              <Card shadow='sm' isPressable className='bg-red-200/60'>
                <CardBody className='overflow-visible p-0'>
                  <Image
                    width={200}
                    height={200}
                    alt={'sunFrame'}
                    className='w-full object-cover rounded-lg shadow-sm'
                    src='/images/sunFrame.png'
                  />
                </CardBody>
                <CardFooter className='text-xl font-bold flex  justify-center items-center'>
                  <p className='text-center text-black'>Sun Pharma</p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
