"use client";

import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./AuthContextProvider";
import { store } from "@/redux/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default Providers;
