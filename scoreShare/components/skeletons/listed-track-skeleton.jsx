import { Skeleton } from "@mui/material";
import React from "react";

const ListedTrackSkeleton = () => {
  return (
    <div className="flex flex-col col-span-2 space-y-3">
      <div className="space-y-2">
        <Skeleton className="w-full h-8 bg-primary/30" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
    </div>
  );
};
export default ListedTrackSkeleton;
