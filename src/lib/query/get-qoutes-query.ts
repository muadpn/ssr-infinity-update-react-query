import { getQoutes, getQoutesQuery } from "@/data/dto/getQuotes";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const qouteInfinityQueryOptions = infiniteQueryOptions({
  queryKey: ["qoutes-infinity"],
  queryFn: ({ pageParam }) => getQoutes({ pageParam }),
  initialPageParam: 0,
  getPreviousPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
    return (lastPage && lastPage.skip - 20) ?? 0;
  },
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
    return (lastPage && lastPage.skip + 20) ?? 0;
  },
});

export const qouteQueryOptions = queryOptions({
  queryKey: ["qoutes"],
  queryFn: getQoutesQuery,
});
