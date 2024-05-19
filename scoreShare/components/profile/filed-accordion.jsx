"use client";
import { useCallback, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { MyTimeAgo } from "../misc/my-time-ago";
import { deleteFileById } from "@/actions/fileActions";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { AlertMessage } from "../misc/alert";
import { PopoverSheet } from "../misc/popover-sheet";
import { UpdateFileForm } from "../form/update-file-form";
import { LoadingTriangles } from "../misc/loading-triangles";

export const FilesAccordion = ({ files }) => {
  const [loading, setLoading] = useState(false);
  const { setFailed, setSuccess, failed, success, resetMessages } =
    useResponseMessages();
  const [copyFiles, setCopyFiles] = useState(files);


  const getTracksInFiles = useCallback(()=>{
    return new Set(
    copyFiles.map((file) => {
      return file.track.name + ":" + file.track.id;
    })
  );
  }, [copyFiles])

  const [open, setOpen] = useState(false);
  const fileId = useRef();

  const tracks = getTracksInFiles();

  const replaceFile = (file) => {
    const filtered = copyFiles.filter((f) => f.id !== file.id);
    setCopyFiles([file, ...filtered]);
  };

  const handleDelete = async () => {
    setLoading(true);
    resetMessages();
    const response = await deleteFileById(fileId.current);
    if (response.success) {
      setOpen(false);
      setSuccess(response.message);
      setCopyFiles(copyFiles.filter((f) => f.id !== response.payload.id));
    } else {
      setFailed(response.message);
    }
    setLoading(failed);
  };

  return (
    <>
      <AlertMessage
        title={"Success"}
        variant={"success"}
        message={success}
        className={" fixed bottom-4 right-4 animate-disappears w-fit"}
      />
      <AlertMessage
        title={"Error"}
        variant={"destructive"}
        message={failed}
        className={" fixed bottom-4 right-4 animate-disappears w-fit"}
      />
      {loading && <LoadingTriangles style={{position: "fixed", bottom: "1rem", right: "1rem"}} />}

      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              file and all the comments attached to it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="p-2 rounded bg-cyan-800/50">
        <Accordion
          type="multiple"
          collapsible="true"
          className="p-2 rounded bg-indigo"
        >
          {Array.from(tracks).map((t, index) => {
            const name = t.split(":")[0];
            const id = t.split(":")[1];
            const count = copyFiles.filter((f) =>f.trackId === id).length;
            return (
              <AccordionItem key={t} value={`item-${index + 1}`}>
                <AccordionTrigger className="w-full font-semibold text-white">
                  <p className="max-w-[70%] flex">
                    <span className="inline-block w-full text-left truncate text-ellipsis">
                      {name}
                      &nbsp;
                    </span>
                    ({count})
                  </p>
                </AccordionTrigger>
                <AccordionContent className="relative space-y-1">
                  {copyFiles
                    .filter((file) => file.trackId === id)
                    .map((file) => {
                      const isUniqueFileInTrack = file.track._count.files;
                      return (
                        <div key={file.id}>
                          <div className="flex items-end justify-between py-3 rounded text-primary/90 ps-3 bg-slate-50">
                            <div>
                              <p className="flex items-center font-semibold capitalize">
                                {file.name} {getType(file)}
                              </p>
                              <p>{file.instrument}</p>
                              <small className="block">
                                Commentaries: {file._count.comments}
                              </small>
                              <small>
                                <MyTimeAgo date={file.uploadedAt} />
                              </small>
                            </div>
                            <div className="flex items-center justify-end pe-5 gap-x-2.5">
                              <PopoverSheet label={<Button>Edit</Button>}>
                                <UpdateFileForm
                                  file={file}
                                  addFile={replaceFile}
                                />
                              </PopoverSheet>
                              {isUniqueFileInTrack > 1 && (
                                <Button
                                  variant="destructive"
                                  className="drop-shadow-md"
                                  onClick={() => {
                                    fileId.current = file.id;
                                    setOpen(true);
                                  }}
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </>
  );
};
function getType(file) {
  const ext = file.url.split(".").pop();
  if (ext === "mp3")
    return <sup className="lowercase text-cyan-500 ms-1">mp3</sup>;
  if (ext === "mp4")
    return <sup className="lowercase text-amber-500 ms-1">mp4</sup>;
  if (ext === "pdf")
    return <sup className="lowercase text-rose-500 ms-1">pdf</sup>;
}