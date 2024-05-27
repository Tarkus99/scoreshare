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

export const PaginationParent = ({start, changePage}) => {
  return (
    <Pagination className={"text-white"}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className={start === 0 ? " pointer-events-none text-muted-foreground !cursor-not-allowed":"cursor-pointer"} onClick={() => changePage(-5)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{((start * 2) / 10) + 1}</PaginationLink>
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
