import React, { Suspense } from "react";
import { MyManrope } from "../misc/manrope";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PopularTracks from "./popular-tracks";
import ListedTrackSkeleton from "../skeletons/listed-track-skeleton";
import { CountdownTimerIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import RecentTracks from "./recent-tracks";

export const FeaturedTracks = () => {
  return (
    <div>
      <h1 className="text-xl text-center md:text-3xl text-shadow-white"></h1>
      <Tabs
        defaultValue="popular"
        className="flex flex-col items-center justify-center w-full "
      >
        <TabsList
          defaultValue="popular"
          className="w-full p-8 text-muted-foreground bg-cyan-800/60"
        >
          <TabsTrigger
            value="popular"
            className="flex gap-1 data-[state=active]:text-xl transition-all"
          >
            <MyManrope>POPULAR TRACKS</MyManrope>
            <LightningBoltIcon color="orange" height={25} width={25} />
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="flex gap-1 data-[state=active]:text-xl transition-all"
          >
            <MyManrope>NEW TRACKS</MyManrope>
            <CountdownTimerIcon color="rgb(3,165,224)" height={25} width={25} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="popular" className="w-full">
          <Suspense fallback={<ListedTrackSkeleton />}>
            <PopularTracks />
          </Suspense>
        </TabsContent>
        <TabsContent value="recent" className="w-full">
          <Suspense fallback={<ListedTrackSkeleton />}>
            <RecentTracks />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};
