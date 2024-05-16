import React from 'react';

const checkout = () => {
  return (
    <>
      <div className='grid grid-cols-3 pb-3'>
        <div className='lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-6 pb-5'>
          <div className='rounded-md'>
            <form id='payment-form' method='POST' action=''>
              <section>
                <h2 className='uppercase tracking-wide text-lg font-semibold text-gray-700 my-2'>
                  Shipping & Billing Information
                </h2>
                <fieldset className='mb-3 bg-white shadow-lg rounded text-gray-600'>
                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>Name</span>
                    <input
                      name='name'
                      className='focus:outline-none px-3'
                      placeholder='Try Odinsson'
                      required
                    />
                  </label>
                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>Email</span>
                    <input
                      name='email'
                      type='email'
                      className='focus:outline-none px-3'
                      placeholder='try@example.com'
                    />
                  </label>
                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>Address</span>
                    <input
                      name='address'
                      className='focus:outline-none px-3'
                      placeholder='10 Street XYZ 654'
                    />
                  </label>
                  <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                    <span className='text-right px-2'>City</span>
                    <input
                      name='city'
                      className='focus:outline-none px-3'
                      placeholder='San Francisco'
                    />
                  </label>
                  <label className='inline-flex w-2/4 border-gray-200 py-3'>
                    <span className='text-right px-2'>State</span>
                    <input
                      name='state'
                      className='focus:outline-none px-3'
                      placeholder='CA'
                    />
                  </label>
                  <label className='xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200'>
                    <span className='text-right px-2 xl:px-0 xl:text-none'>
                      ZIP
                    </span>
                    <input
                      name='postal_code'
                      className='focus:outline-none px-3'
                      placeholder='98603'
                    />
                  </label>
                  <label className='flex border-t border-gray-200 h-12 py-3 items-center select relative'>
                    <span className='text-right px-2'>Country</span>
                    <div
                      id='country'
                      className='focus:outline-none px-3 w-full flex items-center'>
                      <select
                        name='country'
                        className='border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none'>
                        <option value='AU'>Australia</option>
                        <option value='BE'>Belgium</option>
                        <option value='BR'>Brazil</option>
                        <option value='CA'>Canada</option>
                        <option value='CN'>China</option>
                        <option value='DK'>Denmark</option>
                        <option value='FI'>Finland</option>
                        <option value='FR'>France</option>
                        <option value='DE'>Germany</option>
                        <option value='HK'>Hong Kong</option>
                        <option value='IE'>Ireland</option>
                        <option value='IT'>Italy</option>
                        <option value='JP'>Japan</option>
                        <option value='LU'>Luxembourg</option>
                        <option value='MX'>Mexico</option>
                        <option value='NL'>Netherlands</option>
                        <option value='PL'>Poland</option>
                        <option value='PT'>Portugal</option>
                        <option value='SG'>Singapore</option>
                        <option value='ES'>Spain</option>
                        <option value='TN'>Tunisia</option>
                        <option value='GB'>United Kingdom</option>
                        <option value='US'>United States</option>
                      </select>
                    </div>
                  </label>
                </fieldset>
              </section>
            </form>
          </div>
          <div className='rounded-md'>
            <section>
              <h2 className='uppercase tracking-wide text-lg font-semibold text-gray-700 my-2'>
                Payment Information
              </h2>
              <fieldset className='mb-3 bg-white shadow-lg rounded text-gray-600'>
                <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                  <span className='text-right px-2'>Card</span>
                  <input
                    name='card'
                    className='focus:outline-none px-3 w-full'
                    placeholder='Card number MM/YY CVC'
                  />
                </label>
              </fieldset>
            </section>
          </div>
          <button className='submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors'>
            Pay €846.98
          </button>
        </div>
      </div>
    </>
  );
};

export default checkout;
