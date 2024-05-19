"use client";
import React, { useState } from "react";
import { FileViewerParent } from "./file-viewer-parent";
import FileTable from "./fileTable/file-table";

export const FilesInfo = ({ trackId }) => {
  const [currentFile, setCurrentFile] = useState(null);

  return (
    <>
      <FileTable trackId={trackId} setCurrentFile={setCurrentFile} />
      {currentFile && (
        <FileViewerParent file={currentFile} setCurrentFile={setCurrentFile} />
      )}
    </>
  );
};
