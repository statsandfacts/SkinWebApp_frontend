import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <>
        <div className='bg-gradient-to-r from-[#c9f6fc]  to-[#f1ccbb] min-h-screen'>
          {children}
        </div>
      </>
    </>
  );
};

export default AuthLayout;
