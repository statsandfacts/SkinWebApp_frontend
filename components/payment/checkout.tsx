import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Checkout = () => {
  return (
    <>
      <>
        <>
          <div className='flex flex-col justify-start items-start bg-[#010201]'>
            <div className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2 px-6 py-4'>
              <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative py-1'>
                <button onClick={() => {}}>
                  <ArrowLeftIcon width={24} height={24} />
                </button>
              </div>
              <div className='flex flex-col justify-center items-start flex-grow relative overflow-hidden gap-1'>
                <p className='flex-grow-0 flex-shrink-0 text-base font-medium text-left text-white'>
                  Checkout
                </p>
              </div>
            </div>
          </div>
        </>

        {/* Page Body */}
        <div className='flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 bg-[#19191C]'>
          <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-10 md:px-96 md:pt-6 pb-12 md:pb-28'>
            <div className='hidden md:flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 pt-8 gap-2'>
              <div className='flex justify-start items-center flex-grow-0 flex-shrink-0 relative py-1'>
                <button onClick={() => {}}>
                  <ArrowLeftIcon width={24} height={24} />
                </button>
              </div>
              <div className='flex flex-col justify-center items-start flex-grow relative overflow-hidden gap-1'>
                <p className='flex-grow-0 flex-shrink-0 text-xl font-medium text-left text-white'>
                  Back
                </p>
              </div>
            </div>
            <div className='flex flex-col justify-start items-start self-stretch flex-grow md:bg-black/20 md:rounded-2xl flex-shrink-0'>
              <div className='flex flex-col justify-start items-start self-stretch flex-grow gap-8 px-6 pt-6 pb-20'>
                <div className='flex flex-col self-stretch gap-4'>
                  {/* <label className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 flex-grow-0 flex-shrink-0 text-sm font-medium text-left capitalize text-white/[0.64]">
                      {checkOutLabel.address}
                    </span>
                    <div className='w-full'>
                      <Select
                        options={psLocations?.data}
                        onChange={(loc) => setBookingAddress(loc.location)}
                        getOptionLabel={(option) => option.location}
                        getOptionValue={(option) => option.id}
                        styles={customStyles}
                        instanceId={useId()}
                        isSearchable={false}
                      />
                    </div>
                  </label> */}

                  {/* <label className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2'>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 flex-grow-0 flex-shrink-0 text-sm font-medium text-left capitalize text-white/[0.64]">
                      {checkOutLabel.landmark.title}
                    </span>
                    <div className='w-full'>
                      <InputField
                        className='formInput w-full'
                        placeholder={checkOutLabel.landmark.placeHolder}
                        value={landMark}
                        onChange={(e) => setLandMark(e.target.value)}
                      />
                    </div>
                  </label> */}
                </div>

                <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-5'>
                  <p className='flex-grow-0 flex-shrink-0 text-2xl font-medium text-center text-white'>
                    {/* {checkOutLabel.details.title} */}
                  </p>
                </div>
                {/* <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-5'>
                  {checkoutData?.equipment?.length > 0 && (
                    <p className='flex-grow-0 flex-shrink-0 text-2xl font-medium text-center text-white'>
                      {checkOutLabel.equipment}
                    </p>
                  )}
                  <div className='flex flex-col justify-start items-start self-stretch flex-grow relative pb-8'>
                    {checkoutData?.equipment?.length > 0 && (
                      <div className='w-full flex flex-wrap gap-2'>
                        {checkoutData.equipment.map((item, index) => (
                          <div
                            key={index}
                            className='flex-grow-0 flex-shrink-0 text-sm text-white bg-white/10 py-1.5 px-3 rounded-full'>
                            {item.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div> */}
              </div>
              {/* <button
                onClick={paymentHandler}
                className='flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 md:relative gap-[5px] px-[18px] py-[15px] bg-blue-700 hover:bg-blue-800 fixed bottom-0 w-full'
                disabled={loading}>
                <div className='flex flex-col justify-start items-start flex-grow relative gap-0.5'>
                  <p className='flex-grow-0 flex-shrink-0 text-sm text-left text-white'>
                    {loading ? 'Please wait...' : checkOutLabel.pay}
                  </p>
                  <p className='flex-grow-0 flex-shrink-0 text-[27px] font-bold text-left text-white'>
                    ₹ {totalPrice}
                  </p>
                </div>
                {loading ? <LoadingOutlined /> : <ArrowRightIcon />}
              </button> */}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Checkout;
