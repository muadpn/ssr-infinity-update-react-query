import QuotesFetchWrapper from "./qoutes-fetcher-wrapper";



export default async function Home() {
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
