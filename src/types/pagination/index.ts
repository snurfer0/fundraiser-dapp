export interface Paginated<T> {
  data: T[];
  totalCount: number;
  offset: number;
  nextOffset: number;
  limit: number;
  totalPages: number;
}
