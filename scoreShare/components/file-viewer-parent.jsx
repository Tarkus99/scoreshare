import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent, DialogFooter,
  DialogHeader,
  DialogTitle
} from "./ui/dialog";
import { Button } from "./ui/button";
import { LoadingTriangles } from "./misc/loading-triangles";
import Image from "next/image";
import { MyAudioPlayer } from "./media/audio-player";
import { ParentCommentContainer } from "./comments/parent-container";
import { DownloadIcon } from "@radix-ui/react-icons";
import { MyVideoPlayer } from "./media/video-player";
import { PdfViewer } from "./media/pdf-viewer";
import { downloadFile } from "@/fetching";

export const FileViewerParent = ({ file, setCurrentFile }) => {
  const extension = file.url.split(".").splice(-1)[0];
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const getFile = async () => {
    downloadFile(file.url)
      .then((data) => {
        setUrl(URL.createObjectURL(data));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getFile();
  }, []);

  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(open) => {
        if (!open) setCurrentFile(null);
      }}
    >
      <DialogContent
        className="w-11/12 p-0 rounded max-h-[90vh] overflow-y-scroll bg-slate-50 border-slate-200 "
        close={true}
      >
        <DialogHeader className="w-full rounded-t-md">
          <div className="flex items-center p-2 gap-x-2">
            <Image
              alt=""
              width={200}
              height={200}
              src={file.user.image}
              className="w-12 rounded-full aspect-square"
            />
            <DialogTitle className="text-whitems-2">
              {file.user.name}
            </DialogTitle>
            <a href={url} download={true}>
              <Button type="submit">
                <DownloadIcon />
              </Button>
            </a>
          </div>
        </DialogHeader>
        <div className="flex items-center justify-center w-full mb-2 ">
          {loading ? (
            <LoadingTriangles height={100} />
          ) : (
            getMedia(url, extension)
          )}
        </div>
        <ParentCommentContainer file={file} />
        <DialogFooter className="p-2 "></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function getMedia(url, extension) {
  if (extension === "mp3") {
    return <MyAudioPlayer url={url} />;
  }
  if (extension === "mp4") {
    return <MyVideoPlayer url={url} />;
  }
  if (extension === "pdf") {
    return <PdfViewer url={url} />;
  }
}
