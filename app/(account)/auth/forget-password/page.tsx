import React from 'react';
import ResetPasswordForm from '@/components/Auth/ResetPasswordForm';
import CloseButton from '@/components/common/CloseButton';

const ForgetPassword = async () => {
  return (
    <>
      <CloseButton />
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <h1 className='text-black text-xl font-bold'>Reset Password</h1>
        <div className='w-full flex flex-col gap-5 max-w-sm mt-5'>
          <ResetPasswordForm />
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
