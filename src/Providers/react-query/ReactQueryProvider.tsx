"use client";

import {
  dehydrate,
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as React from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/lib/get-query-client";

export function Providers(props: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
        <ReactQueryDevtools client={queryClient} />
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
