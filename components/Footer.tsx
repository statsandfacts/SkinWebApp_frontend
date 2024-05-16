import { CreditCardIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <footer className='bg-white' id='contact'>
        <div className='flex flex-col px-16 pb-10 mt-10 w-full bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full'>
          <div className='flex gap-5 justify-between mx-5 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full'>
            <div className='flex flex-col'>
              <div className='text-2xl font-bold text-green-500'>
                NEXT<span className='text-green-500'>.</span>CARE
              </div>
              <div className='flex gap-2 mt-8 whitespace-nowrap'>
                <div className='my-auto text-xs font-medium text-stone-500'>
                  Email
                </div>
                <div className='flex-auto text-base text-stone-900'>
                  contact@statsandfacts.in
                </div>
              </div>
              <div className='flex gap-2 self-start mt-5 whitespace-nowrap'>
                <div className='my-auto text-xs font-medium text-stone-500'>
                  Phone
                </div>
                <div className='grow text-base text-stone-900'>
                  (+91) 91244 26966
                </div>
              </div>
              <div className='flex gap-2 items-center mt-5'>
                <div className='self-stretch my-auto text-xs font-medium text-stone-500'>
                  Follow us on
                </div>
                <div className='flex items-center'>
                  <Link href='https://www.facebook.com/'>
                    <Image
                      src={'/facebook.svg'}
                      height={30}
                      width={30}
                      alt='facebook'
                    />
                  </Link>
                  <Link href='https://twitter.com/' className='mx-5'>
                    <Image
                      src={'/instagram.svg'}
                      height={30}
                      width={30}
                      alt='instagram'
                    />
                  </Link>
                  <Link href='https://www.linkedin.com/'>
                    <Image
                      src={'/twitter.svg'}
                      height={30}
                      width={30}
                      alt='twitter'
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className='flex gap-5 justify-between self-start text-sm text-stone-900'>
              <div className='flex flex-col flex-1 pr-12'>
                <div className='text-base font-medium whitespace-nowrap'>
                  Get Started
                </div>
                <div className='mt-4 whitespace-nowrap'>Shop Products</div>
                <div className='mt-4 whitespace-nowrap'>Why Next.Care</div>
                <div className='mt-4 whitespace-nowrap max-md:mr-2.5'>
                  How it Works
                </div>
                <div className='mt-4'>Our Story</div>
              </div>
              <div className='flex flex-col flex-1'>
                <div className='text-base font-medium'>Support</div>
                <div className='mt-4'>Blog</div>
                <div className='mt-4'>Reviews</div>
                <div className='mt-4'>Careers</div>
                <div className='mt-4'>Contact Us</div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center px-16 py-2.5 w-full bg-black max-md:px-5 max-md:max-w-full'>
          <div className='flex gap-5 justify-between items-center max-md:flex-wrap'>
            <div className='flex gap-2 self-stretch my-auto text-sm text-white whitespace-nowrap'>
              <ShieldCheckIcon className='w-5 h-5' />
              <div className='grow'>100% Authentic</div>
            </div>

            <div className='flex gap-2 self-stretch my-auto text-sm text-white whitespace-nowrap'>
              <CreditCardIcon className='w-5 h-5' />
              <div className='grow'>Secure Payments</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center px-16 py-6 w-full bg-white text-stone-900 max-md:px-5 max-md:max-w-full'>
          <div className='flex gap-5 justify-between mx-5 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full'>
            <div className='flex-auto my-auto text-sm'>
              Copyright © 2010-2024 Next.Care. All rights reserved.
            </div>
            <div className='flex gap-2 pb-1.5 text-xs whitespace-nowrap'>
              <Link
                href={'/policy/terms-and-condition'}
                className='grow justify-center px-2 py-1.5 border border-solid border-black border-opacity-0'>
                Terms & Conditions
              </Link>
              <Link
                href={'/policy'}
                className='grow justify-center px-2 py-1.5 border border-solid border-black border-opacity-0'>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
