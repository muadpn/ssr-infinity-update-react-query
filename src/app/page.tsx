import { TQoutesResponse } from "@/types/qoutes";
import Image from "next/image";
import QuotesFetchWrapper from "./qoutes-fetcher-wrapper";
import { getQoutes } from "@/data/dto/getQuotes";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { qouteQueryOptions } from "@/lib/query/get-qoutes-query";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

interface IHome {
  params: any;
  searchParams: any;
}

export default async function Home(param: IHome) {
  return (
    <main>
      <div className="flex items-center justify-center flex-col my-12">
        <div>
          <h1 className="text-3xl">Welcome to qoutes collections.</h1>
        </div>
        <div className="mt-12 max-w-7xl w-full">
          <QuotesFetchWrapper />
        </div>
      </div>
    </main>
  );
}
