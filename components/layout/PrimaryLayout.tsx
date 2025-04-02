"use client";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer";
import { usePathname } from "next/navigation";
import { COMMON } from "@/config/const";
import HeaderV1 from "../Header/HeaderV1";
import FooterV1 from "./FooterV1";

const PrimaryLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      {!pathname.includes(COMMON.WITHOUT_HEADER_PAGE) ? (
        <>
          <HeaderV1 />
        </>
      ) : (
        <></>
      )}

      <main className="w-full ">{children}</main>
      {!COMMON.WITHOUT_FOOTER.some((page) => pathname.includes(page)) && (
        <FooterV1 />
      )}
    </>
  );
};

export default PrimaryLayout;
