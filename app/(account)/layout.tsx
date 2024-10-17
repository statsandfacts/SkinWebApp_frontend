"use client";
import { COMMON } from "@/config/const";
import { usePathname } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <>
        {/* <div className={`bg-gradient-to-r ${COMMON.DIGITAL_PRESCRIPTION_ROUTES.includes(pathname) ? "from-slate-200 to-white" : "from-[#c9f6fc]  to-[#f1ccbb]"} min-h-screen`}> */}
        <div
          className={`bg-gradient-to-r from-slate-200 to-white min-h-screen`}
        >
          {children}
        </div>
      </>
    </>
  );
};

export default AuthLayout;
