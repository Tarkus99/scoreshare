import Image from "next/image";
import React from "react";

export const AlbumCoverList = ({ image }) => {
  return (
    <div className="relative w-[15%] aspect-square">
      <Image
        src={image}
        alt=""
        width={200}
        height={200}
        className="w-full h-auto aspect-square album-cover-search drop-shadow-md opacity-90"
      />
    </div>
  );
};
