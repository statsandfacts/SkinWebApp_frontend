import React from 'react';

const PolicyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <>
        <div className='min-h-screen md:px-40 p-5'>{children}</div>
      </>
    </>
  );
};

export default PolicyLayout;
