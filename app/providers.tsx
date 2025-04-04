"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/context/UserContext";
import { SWRConfig } from "swr";
import { Provider as StoreProvider } from "react-redux";
import { store } from "../redux/store";
import { AuthProviderNC } from "@/components/Auth/AuthProviderNC";
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const options = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };

  return (
    // <UserProvider>
    <NextUIProvider>
      <SWRConfig value={options}>
        <StoreProvider store={store}>
          {/* <AuthProviderNC> */}
          <>{children}</>
          {/* </AuthProviderNC> */}
        </StoreProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          transition={Slide}
          theme="colored"
        />
      </SWRConfig>
    </NextUIProvider>
    // </UserProvider>
  );
}
