import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export const AlbumCoverList = ({ image, className }) => {
  return (
    <div className="h-full max-h-32">
      <Image
        src={image}
        alt=""
        width={200}
        height={200}
        className={cn("aspect-square album-cover-search drop-shadow-md opacity-90", className)}
      />
      
    </div>
  );
};
