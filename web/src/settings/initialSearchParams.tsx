export type SearchParams = {
  searchTerm: string;
  order: string;
  careLevel: string[];
  categories: string[];
};

export const initialSearchParams: SearchParams = {
  searchTerm: "",
  order: "",
  careLevel: [] as string[],
  categories: [] as string[],
};
