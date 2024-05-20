import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const PaginationParent = ({currentPage, changePage}) => {
  return (
    <Pagination className={"text-white"}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => changePage(-5)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{currentPage}</PaginationLink>
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext onClick={() => changePage(5)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
