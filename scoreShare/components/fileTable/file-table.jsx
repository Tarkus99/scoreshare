"use client";
import React, { useCallback, useEffect, useState } from "react";

import { Button } from "../ui/button";

import {
  PiFileAudioThin,
  PiFilePdfThin,
  PiFileVideoThin,
} from "react-icons/pi";
import { TableRow } from "./table-row";
import Image from "next/image";
import TableSkeleton from "../skeletons/table-skeleton";
import { UploadFileForm } from "../form/upload-file-form";
import { PopoverSheet } from "../misc/popover-sheet";
import { FileTableFilters } from "./file-table-filters";
import TimeAgo from "timeago-react";
import { getFiles } from "@/actions/fileActions";
import { Separator } from "@radix-ui/react-dropdown-menu";

const FileTable = ({ trackId, setCurrentFile }) => {
  const [files, setFiles] = useState([]);
  const [copyFiles, setCopyFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    (trackId) => {
      setLoading(true);
      getFiles(trackId)
        .then((data) => {
          setFiles(data);
          setCopyFiles(data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    },
    [trackId]
  );

  const addFile = (payload) => {
    setFiles([payload, ...files]);
  };

  useEffect(() => {
    fetchData(trackId);
  }, []);

  if (loading) return <TableSkeleton />;

  return (
    <div className="col-span-2 ">
      <FileTableFilters
        originalFiles={files}
        copyFiles={copyFiles}
        setCopyFiles={setCopyFiles}
      >
        <PopoverSheet
          label={
            <Button variant="outline" className="justify-self-end">
              Upload file
            </Button>
          }
        >
          <UploadFileForm trackId={trackId} addFile={addFile} />
        </PopoverSheet>
      </FileTableFilters>
      {createTable(copyFiles)}
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
              .toSorted((a, b) => b.createdAt - a.createdAt)
              .map((f) => (
                <TableRow
                  className="text-primary-80 ms-2 bg-slate-50 hover:border-amber-300 rounded-[1px] hover:shadow-inner last:rounded-b odd:bg-stone-100"
                  key={f.id}
                  onClick={() => {
                    setCurrentFile(f);
                  }}
                >
                  <div className="truncate text-ellipsis">
                    <p className="items-center overflow-visible capitalize gap-x-1">
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
                        src={f.user.image}
                        className="w-8 rounded-full aspect-square"
                      />
                      <h1 className="hidden md:block">{f.user.name}</h1>
                    </div>
                    <small className="flex-1 text-xs md:text-end text-muted">
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