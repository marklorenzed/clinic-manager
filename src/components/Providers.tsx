"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./AuthContextProvider";
import { store } from "@/redux/store";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default Providers;
