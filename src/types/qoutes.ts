export type TQoutesResponse = {
 quotes: qoute[];
  total: number;
  skip: number;
  limit: number;
};

export type qoute = {
  id: number;
  quote: string;
  author: string;
};
