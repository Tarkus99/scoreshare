"use client";
import { getAccessTokenSpotify, searchTracksInSpotify } from "@/fetching";
import React, { forwardRef, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { SlClose } from "react-icons/sl";
import { DateTime } from "luxon";
import { v4 } from "uuid";
import { AlbumCoverList } from "./album-cover-list";
import { LoadingTriangles } from "../misc/loading-triangles";
import { ListedTrack } from "./listed-track";
import { InputSearchBar } from "./input-search-bar";
import { FaClosedCaptioning } from "react-icons/fa6";
import { FcDeleteRow } from "react-icons/fc";
import { LoadingAndClearButtons } from "./loading-clear-buttons";
import { cn } from "@/lib/utils";

let timeOut;
export const SearchBarSpotify = (props) => {
  const [existingTracks, setExistingTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const searchTracks = async (query) => {
    try {
      setError(null);
      const data = await searchTracksInSpotify(
        query,
        localStorage.getItem("spotify_access_token")
      );
      return data.tracks.items;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const token = await getAccessTokenSpotify();
          localStorage.setItem(
            "spotify_access_token",
            token.access_token.toString()
          );
          return searchTracks(query);
        } catch (error) {
          if (error.response.status === 400)
            setError("One of the keys is invalid...");
          else setError(error.response.data.error);
          return [];
        }
      } else if (error.response) {
        return [];
      }
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    setLoading(true);

    if (timeOut) clearTimeout(timeOut);

    if (!value) {
      setExistingTracks([]);
      setLoading(false);
      return;
    }

    timeOut = setTimeout(async () => {
      const result = await searchTracks(value);
      setExistingTracks(result);
    }, 300);
  };

  const handleTrackClick = (track) => {
    props.setTrackField("key", null);
    props.setTrackField("id", track.id);
    props.setTrackField("name", track.name);
    props.setTrackField("source", track.album.name);
    props.setTrackField("artist", track.artists);
    const date = new Date(track.album.release_date);
    props.setTrackField("date", DateTime.fromJSDate(date));
    props.setTrackField("image", track.album.images[0].url);
    props.setImageSrc(track.album.images[0].url);
    props.setDisabled(true);
    setFocus(false);
  };

  return (
    <div className="relative z-50 flex w-full border-gray-300 rounded-full bg-gray-50 search-bar">
      <InputSearchBar
        variant="form"
        ref={inputRef}
        id="default-search"
        placeholder="Search tracks in Spotify"
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={(e) => {
          if (
            !e.relatedTarget ||
            !e.relatedTarget.classList.contains("track-in-list")
          )
            setFocus(false);
        }}
      />

      <div className="absolute inset-y-0 z-[10000] flex items-center pointer-events-none start-0 ps-3 peer-focus-visible:text-cyan-600">
        <GoSearch className="z-10" />
      </div>

      <LoadingAndClearButtons
        loading={loading}
        handleClear={() => {
          setExistingTracks([]);
          inputRef.current.value = "";
        }}
      />

      {error && (
        <p className="absolute top-[100%] z-50 text-sm text-destructive">
          {error}
        </p>
      )}

      {focus && (
        <div
          className={cn(
            error ? "bg-red-200" : "bg-indigo-100",
            "max-h-[20rem] min-h-[5rem] opacity-[100%] absolute -z-10 w-[110%] left-[50%] -translate-x-[50%] -top-2/4  space-y-[1px] shadow rounded-2xl text-sm overflow-y-scroll snap-y transition-all border border-indigo-200"
          )}
        >
          {existingTracks.length > 0 &&
            existingTracks.map((track) => (
              <div
                className="relative flex items-center justify-between flex-1 gap-1 p-1 overflow-y-hidden transition-all border-transparent cursor-pointer track-in-list text-primary ps-4 bg-gradient-to-l odd:from-indigo-100 odd:to-white even:from-indigo-100 even:to-white auto-cols-fr hover:bg-purple-100 hover:cursor-pointer snap-top hover:shadow-inner first:mt-[5.25rem] first:border first:border-t-green-500"
                tabIndex="0"
                onClick={() => {
                  handleTrackClick(track);
                }}
                key={v4()}
              >
                <ListedTrack track={track}>
                <AlbumCoverList
                    image={track.image || track.album.images[1].url}
                    className="w-16 md:w-28 2xl:w-32"
                  />
                </ListedTrack>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
