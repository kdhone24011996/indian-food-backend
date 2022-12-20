export interface ApiOptions {
  getAll: boolean;
  getSingle: boolean;
  post: boolean;
  put: boolean;
  patch: boolean;
  remove: boolean;
  url: string;
  token?: string;
}

export interface IPagination {
  perPage: number;
  page: number;
  hasPrevious: boolean;
  hasNext: boolean;
  next: string;
  previous: string;
  totalCount: number;
}


export type getSingleI<T> =
  | ((id: string, queryParam?: string) => Promise<T>)
  | undefined;
export type getAllI<T> =
  | ((
      page?: number,
      perPage?: number,
      otherQueryParam?: string
    ) => Promise<{ pagination: IPagination; data: T }>)
  | undefined;
export type postI<T> = ((modal: object) => Promise<T>) | undefined;
export type putI<T> = ((id: string, modal: object) => Promise<T>) | undefined;
export type patchI<T> = ((id: string, modal: object) => Promise<T>) | undefined;
export type removeI<T> = ((id: string) => Promise<T>) | undefined;
