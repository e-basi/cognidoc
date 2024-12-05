"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  // Memoize the QueryClient to avoid reinitialization
  const queryClient = React.useMemo(() => new QueryClient(), []);
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default Providers;
