import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React, { memo, useState } from "react";

export const OpenCloseEyeButton = memo(() => {
  const [showingComments, setShowingComments] = useState(false);
  return (
    <button onClick={() => setShowingComments(!showingComments)}>
      {showingComments ? (
        <EyeOpenIcon width={"1.5rem"} height={"auto"} className="cursor-pointer" />
      ) : (
        <EyeClosedIcon  width={"1.5rem"} height={"auto"} className="cursor-pointer" />
      )}
    </button>
  );
});
