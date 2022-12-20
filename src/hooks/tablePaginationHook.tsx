import { GridSelectionModel } from "@mui/x-data-grid";
import React from "react";

export const usePagination = (): [number, any] => {
  const [page, setPage] = React.useState<number>(1);

  const handleChangePage = async (newPage:number) => {
    if (newPage == page) {
      setPage((preVal) => preVal + 1);
    } else {
      setPage((preVal) => preVal - 1);
    }
  };

  return [page, handleChangePage];
};
