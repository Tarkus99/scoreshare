import React from "react";
import { AlbumCoverList } from "./album-cover-list";

export const ListedTrack = ({ track }) => {
  return (
    <>
      <div className="max-w-[60%] my-2 md:my-0">
        <p className="w-full font-bold underline truncate">{track.name}</p>
        <p className="w-full text-base break-words md:truncate overflow-ellipsis me-1">
          <small>
            <i>{track.album?.name || track.source}</i>
          </small>
          ,
          <small className="ms-1">
            <i>{track.artists.map((a) => a.name).join(", ")}</i>
          </small>
        </p>
        {track.album && (
          <small>{track.album.release_date.substring(0, 4)}</small>
        )}
      </div>
      <AlbumCoverList image={track.image || track.album.images[1].url} />
    </>
  );
};
