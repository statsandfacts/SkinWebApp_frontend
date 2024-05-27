import Checkout from '@/components/payment/checkout';
import React from 'react';
import AuthProvider from '../AuthProvider';

const checkout = () => {
  return (
    <AuthProvider>
      <div className='md:mx-96 pt-5  mx-auto'>
        <div className='lg:col-span-2 col-span-3  space-y-8 px-6 pb-5'>
          <Checkout />
        </div>
      </div>
    </AuthProvider>
  );
};

export default checkout;
