"use client";
import { qouteInfinityQueryOptions } from "@/lib/query/get-qoutes-query";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

/** Content will start fetching  500px distance  */
const VIEW_BEFORE_PX = 500;
// even tho this is a "use client" it will be initially be rendered on server :D
// test it out by uncommenting "test me console.log" / use post-man to fetch as a get request
export default function QouteRenderer() {
  console.log("Uncomment me! am running on server :D"); //Uncomment this
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery(qouteInfinityQueryOptions);

  console.log("I Also have data!!", data); //Uncomment this

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: `${VIEW_BEFORE_PX}px 0px`,
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  // Below code is rendering HTML contents ->
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
            - Loads the data on the go. Meaning will fetch before{" "}
            {VIEW_BEFORE_PX}px Of next content
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
