import { FilesInfo } from "./files-info";
import { getFilesByTrackId } from "@/actions/file";

export const FilesByTrack = async ({ id }) => {
  const files = await getFilesByTrackId(id);

  return <>{files && <FilesInfo trackId={id} files={files} />}</>;
};
