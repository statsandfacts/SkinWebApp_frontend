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
                  Follow
                </div>
                <div className='self-stretch my-auto text-base text-stone-900'>
                  @next.care
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
            {/* <div className='flex gap-2 self-stretch my-auto text-sm text-white whitespace-nowrap'>
              <img
                loading='lazy'
                src='https://cdn.builder.io/api/v1/image/assets/TEMP/b39a0f6eddd5e1f9e11000160fa5b05bceff008ea71b25e1da966f64ba893666?apiKey=15e1f2d0851f47fb85d5e15de811adcf&'
                className='shrink-0 w-4 aspect-square'
              />
              <div className='grow'>100% Authentic</div>
            </div>
            <div className='flex gap-2 self-stretch my-auto text-sm text-white whitespace-nowrap'>
              <img
                loading='lazy'
                src='https://cdn.builder.io/api/v1/image/assets/TEMP/1678e6736f7280460b32767e484f8a0d42a71def4b2972f3059f907bfb926c2c?apiKey=15e1f2d0851f47fb85d5e15de811adcf&'
                className='shrink-0 w-4 aspect-square'
              />
              <div className='grow'>Certified in India</div>
            </div>
            <div className='flex gap-2 self-stretch my-auto text-sm text-white whitespace-nowrap'>
              <img
                loading='lazy'
                src='https://cdn.builder.io/api/v1/image/assets/TEMP/218b425089e9921d5d1ea6941dc5263458732f58bab46ea9f35ca794b129ba03?apiKey=15e1f2d0851f47fb85d5e15de811adcf&'
                className='shrink-0 w-4 aspect-square'
              />
              <div className='grow'>Free shipping on orders above Rs.700</div>
            </div>
            <div className='flex gap-2 self-stretch my-auto text-sm text-white whitespace-nowrap'>
              <img
                loading='lazy'
                src='https://cdn.builder.io/api/v1/image/assets/TEMP/10670c8fd4d383223f1af63969a621257989bb61d675fc361076d8ad9bca9b3a?apiKey=15e1f2d0851f47fb85d5e15de811adcf&'
                className='shrink-0 w-4 aspect-square'
              />
              <div className='grow'>Secure Payments</div>
            </div>
            <div className='flex gap-3 self-stretch'>
              <div className='flex flex-1 justify-center items-center p-1 bg-white rounded'>
                <img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/2ed63aa934c3dad8492702b521b707eb28b05d54e4fea5f0f92b2a6695f11881?apiKey=15e1f2d0851f47fb85d5e15de811adcf&'
                  className='aspect-[1.25] w-[25px]'
                />
              </div>
              <div className='flex flex-1 justify-center items-center p-1 bg-white rounded'>
                <img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/908c5c9f0b84bce474d0082daefff9403e13714347753aeab2536ab0f1f30f50?apiKey=15e1f2d0851f47fb85d5e15de811adcf&'
                  className='aspect-[1.3] w-[26px]'
                />
              </div>
              <div className='flex flex-1 justify-center items-center px-1 py-1.5 bg-white rounded'>
                <img
                  loading='lazy'
                  src='https://cdn.builder.io/api/v1/image/assets/TEMP/f323d3c9bcf4af4141205ddee9123ec52b17b9cd666350b9b0d083eaf2473a08?apiKey=15e1f2d0851f47fb85d5e15de811adcf&'
                  className='aspect-[3.03] w-[49px]'
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className='flex flex-col justify-center px-16 py-6 w-full bg-white text-stone-900 max-md:px-5 max-md:max-w-full'>
          <div className='flex gap-5 justify-between mx-5 max-md:flex-wrap max-md:mr-2.5 max-md:max-w-full'>
            <div className='flex-auto my-auto text-sm'>
              Copyright © 2010-2024 Next.Care. All rights reserved.
            </div>
            <div className='flex gap-2 pb-1.5 text-xs whitespace-nowrap'>
              <div className='grow justify-center px-2 py-1.5 border border-solid border-black border-opacity-0'>
                Terms & Conditions
              </div>
              <div className='grow justify-center px-2 py-1.5 border border-solid border-black border-opacity-0'>
                Privacy Policy
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
