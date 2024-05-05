import ChangePasswordForm from '@/components/Auth/ChangePasswordForm';
import TitleHeader from '@/components/user/TitleHeader';
import React from 'react';

const ChangePassword = () => {
  return (
    <div className='w-full h-full flex flex-col'>
      <TitleHeader
        title='Change Password'
        desc=''
        isBack={false}
        isMobileBack={true}
      />
      <div className='w-full flex flex-col gap-5 max-w-sm mt-5 pb-5'>
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePassword;
