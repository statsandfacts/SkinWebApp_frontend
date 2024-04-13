import SignupForm from '@/components/Auth/SignupForm';
import React from 'react';

const SignUp = () => {
  return (
    <>
      <div className='w-full flex flex-col items-center justify-center py-12'>
        <h1 className='text-black text-xl font-bold'>Create your account</h1>
        <div className='w-full flex flex-col gap-5 max-w-sm mt-4'>
          <SignupForm />
        </div>
      </div>
    </>
  );
};

export default SignUp;
