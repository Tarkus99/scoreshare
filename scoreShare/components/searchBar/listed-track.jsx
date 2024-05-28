import React from "react";

export const ListedTrack = ({ track, children }) => {
  return (
    <>
      <div className="max-w-[70%] my-2 md:my-0 text-base">
        <p className="w-full font-semibold capitalize truncate transition-all group-hover:text-indigo-800">
          {track.name}
        </p>
        <p className="w-full text-base capitalize break-words group-hover:text-indigo-500 md:truncate overflow-ellipsis me-1">
          <small>
            <i>{track.album?.name || track.source}</i>
          </small>
        </p>
        <p>
          <small className="text-sm">
            <i>{track.artists.map((a) => a.name).join(", ")}</i>
          </small>
        </p>
        {track.album && (
          <small>{track.album.release_date.substring(0, 4)}</small>
        )}
      </div>
      {children}
    </>
  );
};
