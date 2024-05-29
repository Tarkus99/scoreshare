"use client";
import { getAvailableTracks } from "@/fetching";
import Link from "next/link";
import React, { Fragment, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { GoPlus } from "react-icons/go";
import { v4 } from "uuid";
import { AlbumCoverList } from "./album-cover-list";
import { ListedTrack } from "./listed-track";
import { InputSearchBar } from "./input-search-bar";
import { LoadingAndClearButtons } from "./loading-clear-buttons";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { AlertMessage } from "../misc/alert";

let timeOut;
export const SearchBar = ({ isSearching }) => {
  const [existingTracks, setExistingTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setFailed, failed } = useResponseMessages();
  const inputRef = useRef();

  const onChange = (e) => {
    setLoading(true);
    const value = e.target.value;
    if (timeOut) clearTimeout(timeOut);
    
    if (!value) {
      setExistingTracks([]);
      setLoading(false);
      return;
    }
    
    timeOut = setTimeout(async () => {
      try {
        const data = await getAvailableTracks(value);
        setExistingTracks(data);
      } catch (error) {
        setExistingTracks([]);
        setFailed(error.message);
      } finally {
        setLoading(false);
      }
    }, 250);
  };

  return (
    <Fragment>
      <div className="relative z-0 flex w-full border-gray-300 rounded-full search-bar bg-gray-50">
        <InputSearchBar
          variant={isSearching ? "default" : "navbar"}
          placeholder="Search for songs, artists, ..."
          onChange={onChange}
          ref={inputRef}
        />

        <div className="absolute inset-y-0 flex items-center order-1 pointer-events-none start-0 ps-3 peer-focus-visible:text-blue-600">
          <GoSearch className="z-10" />
        </div>
        <LoadingAndClearButtons
          loading={loading}
          showClear={isSearching}
          handleClear={() => {
            inputRef.current.value = "";
            setExistingTracks([]);
          }}
        />
        {isSearching && (
          <div className="absolute max-h-[60vh] overflow-y-scroll flex flex-col gap-0 top-[85%] space-y-1 inset-x-0 p-1 pt-2 -z-10 bg-gray-100 rounded-sm text-xl sm:text-base md:text-sm">
            {existingTracks.map((track) => (
              <Link key={v4()} href={`/tracks/[id]`} as={`/tracks/${track.id}`}>
                <div className="relative flex items-center justify-between flex-1 gap-1 p-1 overflow-y-hidden border-transparent cursor-pointer group sm:transition-all text-primary ps-4 bg-gradient-to-l odd:from-slate-100 odd:to-slate-200 even:from-zinc-100 even:to-zinc-100 auto-cols-fr hover:bg-purple-100 hover:cursor-pointer hover:border-indigo-100 hover:shadow-inner">
                  <ListedTrack track={track}>
                    <AlbumCoverList
                      image={track.image || track.album.images[1].url}
                      className="w-16 md:w-24 2xl:w-28"
                    />
                  </ListedTrack>
                </div>
              </Link>
            ))}
            <Link href={"/tracks/create-track"} replace>
              <div className="flex items-center gap-1 p-1 transition-all cursor-pointer hover:bg-blue-100">
                <GoPlus className="text-blue-600" />
                <p>Create new track</p>
              </div>
            </Link>
          </div>
        )}
      </div>
      <AlertMessage
        title={"Error"}
        variant={"destructive"}
        message={failed}
        className={" fixed bottom-4 animate-alert-message right-4 w-fit"}
      />
    </Fragment>
  );
};
