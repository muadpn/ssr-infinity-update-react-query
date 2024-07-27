import { TQoutesResponse } from "@/types/qoutes";

export const getQoutes = async ({ pageParam }: { pageParam: number }) => {
  try {
    const data = await fetch(
      `https://dummyjson.com/quotes?limit=20&skip=${pageParam}`
    );
    const initialData: TQoutesResponse = await data.json();
    
    return initialData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getQoutesQuery = async () => {
  try {
    const data = await fetch(`https://dummyjson.com/quotes?limit=10`);
    const initialData: TQoutesResponse = await data.json();
    return initialData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
