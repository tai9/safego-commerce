
export type SearchResultType = "product" | "order" | "customer" | "user" | "setting" | "report";

export type SearchResult = {
  id: string;
  title: string;
  description?: string;
  path: string;
  type: SearchResultType;
};
