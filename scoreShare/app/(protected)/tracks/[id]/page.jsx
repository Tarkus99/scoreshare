import { FilesByTrack } from "@/components/files-section";
import TrackSkeleton from "@/components/skeletons/track-skeleton";
import { TrackInfo } from "@/components/track-info";
import { getTrackByIdData } from "@/data/track";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const Track = async ({ params }) => {
  const track = await getTrackByIdData(params.id);
  if (!track) return notFound();
  return (
    <div className="flex flex-col w-full p-2 space-y-2 rounded shadow-2xl sm:w-11/12 md:w-10/12 xl:w-4/5 backdrop-blur-sm">
      
      <Suspense fallback={<TrackSkeleton />}>
        <TrackInfo id={params.id} />
      </Suspense>
      <FilesByTrack id={params.id} />
      
    </div>
  );
};

export default Track;
