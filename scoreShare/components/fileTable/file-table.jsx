"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { TableRow } from "./table-row";
import Image from "next/image";
import { PopoverSheet } from "../misc/popover-sheet";
import { FileTableFilters } from "./file-table-filters";
import TimeAgo from "timeago-react";
import { PaginationParent } from "./pagination-parent";
import { useFiltersRef } from "@/hooks/filters-ref";

const FileTable = ({ files: propsFiles, setCurrentFile, children }) => {
  const [copyFiles, setCopyFiles] = useState(propsFiles);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const filtersRef = useFiltersRef();
  const changePage = (value) => {
    if (propsFiles.length - 1 < startIndex + value || startIndex + value < 0) return;
    setStartIndex(startIndex + value);
    setEndIndex(endIndex + value);
  };

  return (
    <div className="col-span-2 ">
      <FileTableFilters
        originalFiles={propsFiles}
        copyFiles={copyFiles}
        setCopyFiles={setCopyFiles}
        filtersRef={filtersRef}
      >
        <PopoverSheet
          label={
            <Button variant="outline" className="rounded-full justify-self-end">
              Upload file
            </Button>
          }
        >
          {children}
        </PopoverSheet>
      </FileTableFilters>
      {createTable(copyFiles)}
      <PaginationParent
        currentPage={(startIndex * 2) / 10 + 1}
        changePage={changePage}
      />
    </div>
  );
  function createTable(files) {
    return (
      <div className="p-0 min-h-[450px] rounded">
        <div className="relative overflow-hidden py-0.5 px-0.5 rounded-md h-auto max-h-96 overflow-y-scroll shadow  bg-cyan-800/50">
          <TableRow className="sticky top-0 font-bold rounded-t-sm shadow-xl  !text-white hover:shadow-md">
            <div>
              <h1>Name</h1>
            </div>
            <div className="hidden md:block">
              <h1>Intrument</h1>
            </div>
            <div>
              <h1>Created by</h1>
            </div>
          </TableRow>
          {files.length === 0 ? (
            <TableRow className="bg-[#fffb]">
              <div colSpan="4" className="text-center">
                No items founded
              </div>
            </TableRow>
          ) : (
            files
              .slice(startIndex, endIndex)
              .toSorted((a, b) => b.createdAt - a.createdAt)
              .map((f) => (
                <TableRow
                  className="text-primary-80 ms-2 bg-slate-50 hover:border-amber-300 rounded-[1px] hover:shadow-inner last:rounded-b odd:bg-stone-100"
                  key={f.id}
                  onClick={() => {
                    setCurrentFile(f);
                  }}
                >
                  <div className="w-full group">
                    <p className="items-center w-full overflow-y-visible capitalize truncate transition-all group-hover:text-indigo-800 text-ellipsis gap-x-1">
                      {removeExtensionFromName(f.name)} {getType(f)}
                    </p>
                  </div>
                  <div className="hidden font-semibold md:block">
                    {f.instrument}
                  </div>
                  <div className="flex flex-wrap">
                    <div className="flex items-center justify-center w-full gap-x-4">
                      <Image
                        alt=""
                        width={200}
                        height={200}
                        src={f.user.image || "/defaultUser.png"}
                        className="w-8 rounded-full aspect-square"
                      />
                      <h1 className="hidden md:block">{f.user.name}</h1>
                    </div>
                    <small className="flex-1 text-xs md:text-end text-muted-foreground">
                      <TimeAgo datetime={f.uploadedAt} />
                    </small>
                  </div>
                </TableRow>
              ))
          )}
        </div>
      </div>
    );
  }
};

export default React.memo(FileTable);

function getType(file) {
  const ext = file.url.split(".").pop();
  if (ext === "mp3")
    return <sup className="text-sm lowercase text-cyan-500 ms-1">mp3</sup>;
  if (ext === "mp4")
    return <sup className="lowercase text-amber-500 ms-1">mp4</sup>;
  if (ext === "pdf")
    return <sup className="lowercase text-rose-500 ms-1">pdf</sup>;
}

function removeExtensionFromName(name) {
  const arr = name.split(".");
  if (arr.length > 1) return arr.slice(0, -1).join(".");

  return name;
}
