import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => (
  <div className="flex flex-col col-span-2 space-y-3">
    <Skeleton className="self-end h-16 w-52 rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="w-full h-8 bg-primary/30" />
      <Skeleton className="w-full h-8" />
      <Skeleton className="w-full h-8" />
    </div>
  </div>
);
export default TableSkeleton;
