import React from 'react';
import LoginForm from '@/components/Auth/LoginForm';

const login = async () => {
  return (
    <>
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <h1 className='text-black text-xl font-bold'>Login to your account</h1>
        <div className='w-full flex flex-col gap-5 max-w-sm mt-5'>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default login;
