import React from 'react';
import AuthProvider from '../../AuthProvider';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <>{children}</>
      </AuthProvider>
    </>
  );
};

export default AuthLayout;
