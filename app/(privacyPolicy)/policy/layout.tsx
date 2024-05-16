import React from 'react';

const PolicyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <>
        <div className='min-h-screen  p-5'>{children}</div>
      </>
    </>
  );
};

export default PolicyLayout;
