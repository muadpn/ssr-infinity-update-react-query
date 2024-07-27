import { getQoutes, getQoutesQuery } from "@/data/dto/getQuotes";
import {
  qouteInfinityQueryOptions,
  qouteQueryOptions,
} from "@/lib/query/get-qoutes-query";
import { TQoutesResponse } from "@/types/qoutes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import QouteRenderer from "./qoute-renderer";
import { getQueryClient } from "@/Providers/react-query/ReactQueryProvider";

export default async function QuotesFetchWrapper() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(qouteInfinityQueryOptions);

  return (
    <div className="flex flex-col items-center ">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <QouteRenderer />
      </HydrationBoundary>
    </div>
  );
}

// /   const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
//     useInfiniteQuery({
//       queryKey: ["qoutes"],
//       queryFn: async ({ pageParam }) => await getQoutes({ pageParam }),
//       initialPageParam: initialDatas.skip,
//       refetchInterval: 1000,
//       getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
//         return lastPageParam + 20;
//       },
//       initialData: {
//         pageParams: [initialDatas.skip],
//         pages: [initialDatas],
//       },
//     });
