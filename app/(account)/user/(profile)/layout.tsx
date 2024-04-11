import MyProfile from '@/components/user/MyProfile';
import React from 'react';

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mt-5 md:mt-0 md:p-5'>
      <div className='flex flex-col md:justify-start relative min-h-screen w-full md:px-10'>
        <div className='bg-white px-3 rounded-md flex flex-col w-full self-stretch md:pt-6'>
          <div className='flex'>
            <div className='hidden md:flex flex-col self-stretch min-w-[280px] max-w-[280px]'>
              <MyProfile />
            </div>
            <div className='flex flex-col self-stretch gap-6 md:gap-4 w-full mt-3 mb-10'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
