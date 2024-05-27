"use client";
import React, { useState } from "react";
import { FileViewerParent } from "./file-viewer-parent";
import FileTable from "./fileTable/file-table";
import { UploadFileForm } from "./form/upload-file-form";

export const FilesInfo = ({ trackId, files }) => {
  const [currentFile, setCurrentFile] = useState(null);

  return (
    <>
      <FileTable
        trackId={trackId}
        files={files}
        setCurrentFile={setCurrentFile}
      >
        <UploadFileForm trackId={trackId} />
      </FileTable>
      {currentFile && (
        <FileViewerParent file={currentFile} setCurrentFile={setCurrentFile} />
      )}
    </>
  );
};
