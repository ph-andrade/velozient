import { Dispatch, SetStateAction } from "react";

export interface PaginationHooks {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}