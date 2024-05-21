import { memo } from "react";

import { FilesInfo } from "./files-info";
import { MyManrope } from "./misc/manrope";

export const FilesByTrack = memo(async ({ id }) => {
  return (
    <section
      style={{ gridTemplateColumns: "60% 40%" }}
      className="grid p-4 rounded gap-y-4 gap-x-1 md:flex-row "
    >
      <div className="w-full col-span-2">
        <div className="flex justify-between gap-2">
          <h1 className="text-2xl border-b md:text-3xl border-white !text-white text-shadow-white">
            <MyManrope>FILES UPLOADED BY THE USERS</MyManrope>
          </h1>
        </div>
      </div>
      <FilesInfo trackId={id}></FilesInfo>
    </section>
  );
});
