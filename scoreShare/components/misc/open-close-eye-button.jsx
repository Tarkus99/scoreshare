import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React, { memo, useState } from "react";

export const OpenCloseEyeButton = memo(() => {
  const [showingComments, setShowingComments] = useState(false);
  return (
    <button onClick={() => setShowingComments(!showingComments)}>
      {showingComments ? (
        <EyeOpenIcon width={32} height={32} className="cursor-pointer" />
      ) : (
        <EyeClosedIcon width={32} height={32} className="cursor-pointer" />
      )}
    </button>
  );
});
