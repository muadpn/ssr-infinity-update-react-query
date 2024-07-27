import { qouteInfinityQueryOptions } from "@/lib/query/get-qoutes-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import QouteRenderer from "./qoute-renderer";
import { getQueryClient } from "@/lib/get-query-client";

export default async function QuotesFetchWrapper() {
  //Need to initialize Query client everytime on server when prefetching
  const queryClient = getQueryClient();
  /**
   * Right now prefetched data is always available
   * Prefetched data will be statically generated This is static generated. 😊
   * We could also make it as dynamic (we probably will be using some header in anyof the componenet's)
   *
   */
  queryClient.prefetchInfiniteQuery(qouteInfinityQueryOptions);

  return (
    <div className="flex flex-col items-center ">
      {/* Dehyrdrate the server query client to nearest QueryClient Provider which is on (Root-Layout) */}
      {/* Dehydration is done automatically with ReactQueryStreamedHydration (experimental Package recommended by @tanstack) Futher testing is needed on our side.
      
      but Hey! its working :D
      */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <QouteRenderer />
      </HydrationBoundary>
    </div>
  );
}
