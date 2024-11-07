import { COMMON } from '@/config/const';
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
              <div className='text-xl text-gray-500'>
                <div className='flex justify-center items-end'>
                  <Image
                    src='/logo.svg'
                    width={100}
                    height={100}
                    alt='nextcare logo'
                  />
                  <span className='text-gray-500'>Beta</span>
                </div>
              </div>
              <div className='flex gap-2 mt-8 whitespace-nowrap'>
                <div className='my-auto text-xs font-medium text-stone-500'>
                  By
                </div>
                <div className='flex-auto  text-xs font-medium text-stone-700'>
                  Stats & Facts Technologies Pvt. Ltd.
                </div>
              </div>
              <div className='flex gap-2 self-start mt-5 whitespace-nowrap'>
                <div className='my-auto text-xs font-medium text-stone-500'>
                  Email
                </div>
                <div className='flex-auto  text-xs font-medium text-stone-700'>
                  contact@statsandfacts.in
                </div>
              </div>
              <div className='flex gap-2 self-start mt-5 whitespace-nowrap'>
                <div className='my-auto text-xs font-medium text-stone-500'>
                  Phone
                </div>
                <div className='grow  text-xs font-medium text-stone-700'>
                  (+91) 91244 26966
                </div>
              </div>
              <div className='flex gap-2 items-center mt-5'>
                <div className='self-stretch my-auto text-xs font-medium text-stone-500'>
                  Follow us on
                </div>
                <div className='flex items-center gap-3'>
                  <Link
                    href='https://www.instagram.com/nextcare.life?igsh=MTdkMjg5M2s2NmRobA%3D%3D&utm_source=qr'
                    className=''>
                    <Image
                      src={'/instagram.svg'}
                      height={20}
                      width={20}
                      alt='instagram'
                    />
                  </Link>
                  <Link href='https://www.linkedin.com/company/nextcare-life/'>
                    <Image
                      src={'/linkedin.svg'}
                      height={20}
                      width={20}
                      alt='facebook'
                    />
                  </Link>

                  <Link href='https://twitter.com/NextcareLife'>
                    <Image
                      src={'/twitter.svg'}
                      height={20}
                      width={20}
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
                <Link href={'/hcr'} className='mt-4'>
                  HCR
                </Link>
                {/* <Link href={'/coming-soon'} className='mt-4 whitespace-nowrap'>
                  Shop Products
                </Link> */}
                <Link href={'/why-next-care'} className='mt-4 whitespace-nowrap'>
                  Why {COMMON.APP_NAME}
                </Link>
                <Link
                  href={'/how-it-works'}
                  className='mt-4 whitespace-nowrap max-md:mr-2.5'>
                  How it Works
                </Link>
                <Link href={'/coming-soon'} className='mt-4'>
                  Our Story
                </Link>
              </div>
              <div className='flex flex-col flex-1'>
                <Link href={'/coming-soon'} className='text-base font-medium'>
                  Support
                </Link>
                <Link href={'/blog'} className='mt-4'>
                  Health Feed
                </Link>
                <Link href={'/coming-soon'} className='mt-4'>
                  Reviews
                </Link>
                <Link href={'/coming-soon'} className='mt-4'>
                  Careers
                </Link>
                <Link href={'/contact-us'} className='mt-4'>
                  Contact Us
                </Link>
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
          <div className='flex flex-wrap gap-5 justify-between mx-5 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full'>
            <div className='flex-auto my-auto text-sm'>
              Copyright © {new Date().getFullYear()}
              {/* <Link href={COMMON.APP_URL} className='capitalize text-blue-500'>
                {' '}
                Stats & Facts Technologies Pvt. Ltd.
              </Link> */}
              <div className='flex gap-2 my-auto text-sm'>
              Stats & Facts Technologies Pvt. Ltd.
              </div>
            </div>
            <div className='flex flex-wrap gap-2 pb-1.5 text-xs whitespace-nowrap'>
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
              <Link
                href={'/policy/refund-cancellation'}
                className='grow justify-center px-2 py-1.5 border border-solid border-black border-opacity-0'>
                Refund & Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
