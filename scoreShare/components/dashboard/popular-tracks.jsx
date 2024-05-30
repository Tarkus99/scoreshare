import { getPopularTracks } from "@/actions/tracks";
import React from "react";

import { TrackCardDashboard } from "./track-card-dashboard";

const PopularTracks = async () => {
  const tracks = await getPopularTracks();
  return (
    <div className="grid grid-flow-row grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {tracks.map((item) => (
        <TrackCardDashboard key={item.id} item={item}/>
      ))}
    </div>
  );
};
export default PopularTracks;
