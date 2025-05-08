export interface Paginated<T> {
  data: T[], // array of items - users, tweets, comments, etc.
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  },
  links: {
    first: string;
    last: string;
    current: string;
    next: string;
    prev: string;
  }
}
