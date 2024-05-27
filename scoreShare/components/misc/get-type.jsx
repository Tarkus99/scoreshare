export const GetMediaType = ({file}) => {
    if (!file) return null;
    const ext = file.url?.split(".").pop();
    if (ext === "mp3")
      return <sup className="lowercase text-cyan-500 ms-1">mp3</sup>;
    if (ext === "mp4")
      return <sup className="lowercase text-amber-500 ms-1">mp4</sup>;
    if (ext === "pdf")
      return <sup className="lowercase text-rose-500 ms-1">pdf</sup>;
  };