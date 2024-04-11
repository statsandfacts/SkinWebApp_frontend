import MyProfile from '@/components/user/MyProfile';
import React from 'react';

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center md:p-5'>
      <div className='flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 bg-[#fff] h-screen md:h-min rounded-md w-full md:max-w-2xl md:m-auto'>
        <div className='w-full md:flex'>
          <MyProfile />
        </div>
      </div>
    </div>
  );
};

export default page;
