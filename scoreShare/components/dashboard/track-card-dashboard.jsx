"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const TrackCardDashboard = ({item}) => {
  return (
    <div
          key={item.id}
          className="relative flex items-center justify-between flex-1 w-full h-auto gap-1 p-1 overflow-y-hidden transition-all rounded cursor-pointer group sm:transition-all text-primary hover:bg-purple-100 hover:cursor-pointer hover:shadow-inner max-h-32 hover:scale-105 hover:z-50"
        >
          <a href={`/tracks/${item.id}`} className="inline-block overflow-hidden max-w-[60%] md:max-w-[70%]" onClick={()=>{
            document.body.style.cursor ="wait";
          }}>
            <div className="relative z-10 p-4 my-2 text-base rounded shadow-xl md:my-0 bg-slate-50 overflow-clip">
              <p className="w-full font-semibold capitalize truncate transition-all group-hover:text-indigo-800">
                {item.name}
              </p>
              <p className="w-full text-base capitalize break-words truncate group-hover:text-indigo-500 overflow-ellipsis me-1">
                <small>
                  <i>{item.album?.name || item.source}</i>
                </small>
                ,
                <small className="text-sm ms-1">
                  <i>{item.artists.map((a) => a.name).join(", ")}</i>
                </small>
              </p>
              {item.album && (
                <small>{item.album.release_date.substring(0, 4)}</small>
              )}
            </div>
            <Image style={{filter: "opacity(90%)"}} alt="track-image" className="absolute top-0 left-0 z-0 -translate-y-[50%] filter-[contrast(200%)]" height={1000} width={1000} objectFit="cover" src={item.image} />
          </a>
        </div>
  )
}
