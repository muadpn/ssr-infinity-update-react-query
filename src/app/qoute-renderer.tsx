"use client";
import { getQoutes } from "@/data/dto/getQuotes";
import { getQueryClient } from "@/lib/get-query-client";
import { qouteInfinityQueryOptions } from "@/lib/query/get-qoutes-query";
import {
  InfiniteQueryObserver,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { InView, useInView } from "react-intersection-observer";
/** Content will start fetching  500px distance  */
const VIEW_BEFORE_PX = 500;

export default function QouteRenderer() {
  const { data, fetchNextPage, isFetchingNextPage, fetchPreviousPage,hasNextPage } =
    useSuspenseInfiniteQuery(qouteInfinityQueryOptions);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: `${VIEW_BEFORE_PX}px 0px`,
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  // console.log(hasNextPage)
  return (
    <div className="flex flex-col">
      <div className=" my-12">
        <h1 className="text-xl text-white">Features</h1>
        <div className="prose">
          <p>
            - Load the Initial Data on server because of this page will load
            Javascript Disabled
          </p>
          <p>- SEO friendly and SSR support</p>
          <p>
            - Loads the data on the go. Meaning will fetch before {VIEW_BEFORE_PX}px Of next content 
          </p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {data.pages ? (
          data.pages.map((item) =>
            item?.quotes.map((qoute, i) => {
              let ViewDiv = i % 20 === 0;
              return (
                <div
                  key={`${qoute.id}-${Math.random()}`}
                  className="border-2 max-w-md w-full  rounded-md py-2 px-1"
                >
                  <p>Qoute number: {qoute.id}</p>
                  <p> Author: {qoute.author}</p>
                  <div className="mt-2">
                    <q>{qoute.quote}</q>
                  </div>
                </div>
              );
            })
          )
        ) : (
          <div>
            <p>Nothing to load...</p>
          </div>
        )}
      </div>
      {hasNextPage ? <div ref={ref} className="w-full mt-2 " /> : null}
      {/* We could do a Trigger div that will hit the refetch, Also even better we could put this on the element that is n-10 */}
      <div className="flex items-center justify-center my-2">
        {isFetchingNextPage ? (
          <>
            <div>
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          </>
        ) : null}
      </div>
      <button
        className="p-4 border-2 text-xl"
        ref={ref}
        onClick={() => fetchNextPage()}
      >
        getMore
      </button>
      <button
        className="p-4 border-2 text-xl mt-2"
        onClick={() => {
          console.log("helloF");
          fetchPreviousPage();
        }}
      >
        getLess
      </button>
    </div>
  );
}
