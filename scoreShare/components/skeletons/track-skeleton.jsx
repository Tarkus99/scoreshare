import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TrackSkeleton = (props) => (
  <div className="flex flex-col items-center space-y-3">
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
    </div>
    <Skeleton className="rounded-lg h-52 w-52" />
  </div>
);
export default TrackSkeleton;
