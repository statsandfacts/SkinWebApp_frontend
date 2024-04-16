'use client';
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer';
import { usePathname } from 'next/navigation';
import { COMMON } from '@/config/const';

const PrimaryLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      {!pathname.includes(COMMON.WITHOUT_HEADER_PAGE) ? (
        <>
          <Header />
        </>
      ) : (
        <></>
      )}

      <main className='w-full '>{children}</main>
      {!COMMON.WITHOUT_FOOTER.some((page) => pathname.includes(page)) && (
        <Footer />
      )}
    </>
  );
};

export default PrimaryLayout;
