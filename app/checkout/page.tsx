import React from 'react';

const checkout = () => {
  return (
    <>
      <div className='md:pl-24 pt-5'>
        <div className='lg:col-span-2 col-span-3  space-y-8 px-6 pb-5'>
          <div className='rounded-md'>
            <section>
              <h2 className='uppercase tracking-wide text-lg font-semibold text-black my-2'>
                Payment Information
              </h2>

              <ul>
                <li className='flex items-center justify-between py-2'>
                  <span className='text-gray-500'>
                    Appointment Charges
                    <span className='text-red-500 pl-5'>200</span>
                  </span>
                </li>
                <li className='flex items-center justify-between py-2'>
                  <span className='text-gray-500'>
                    GST
                    <span className='text-red-500 pl-5'>50</span>
                  </span>
                </li>
                <hr />
                <li className='flex items-center justify-between py-2'>
                  <span className='text-gray-500'>
                    Total
                    <span className='text-red-500 pl-5'>250</span>
                  </span>
                </li>
              </ul>

              <p>
                <span className='text-gray-500'>
                  You will be charged 250 for this order.
                  <br />
                </span>
              </p>
            </section>
          </div>
          <button className='submit-button px-4 py-3 rounded-full bg-blue-500 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors'>
            Pay 250.00
          </button>
        </div>
      </div>
    </>
  );
};

export default checkout;
