import Image from "next/image";
import React from "react";

export const AlbumCoverList = ({ image }) => {
  return (
    <div className="h-full max-h-32">
      <Image
        src={image}
        alt=""
        width={500}
        height={500}
        className="w-[8rem] max-h-28 aspect-square album-cover-search drop-shadow-md opacity-90"
      />
      
    </div>
  );
};
