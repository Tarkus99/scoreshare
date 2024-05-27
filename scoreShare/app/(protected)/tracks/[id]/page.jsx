import { FilesByTrack } from "@/components/files-section";
import { MyManrope } from "@/components/misc/manrope";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import TrackSkeleton from "@/components/skeletons/track-skeleton";
import { TrackInfo } from "@/components/track-info";
import { getTrackByIdData } from "@/data/track";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const Track = async ({ params }) => {
  const track = await getTrackByIdData(params.id);
  if (!track) return notFound();
  return (
    <div className="flex flex-col w-full p-2 space-y-2 rounded shadow-2xl sm:w-11/12 md:w-10/12 xl:w-5/6 backdrop-blur-sm">
      <Suspense fallback={<TrackSkeleton />}>
        <TrackInfo id={params.id} />
      </Suspense>
      <section
        style={{ gridTemplateColumns: "60% 40%" }}
        className="grid p-1 md:p-2 2xl:p-4 rounded gap-y-4 gap-x-1 md:flex-row "
      >
        <div className="w-full col-span-2">
          <div className="flex justify-between gap-2">
            <h1 className="text-2xl border-b md:text-3xl border-white !text-white text-shadow-white">
              <MyManrope>FILES UPLOADED BY THE USERS</MyManrope>
            </h1>
          </div>
        </div>
        <Suspense fallback={<TableSkeleton />}>
          <FilesByTrack id={params.id} />
        </Suspense>
      </section>
    </div>
  );
};

export default Track;
