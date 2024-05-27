/* import "mui-player/dist/mui-player.min.css";
import MuiPlayer from "mui-player"; */

import React from "react";

export const MyVideoPlayer = ({ url }) => {
  /*v ar mp = new MuiPlayer({
    container: "#mui-player",
    autoplay: true,
    src: url,
  });
  return (
    <div
      className="w-10/12 rounded-sm aspect-video md:w-8/12"
      id="mui-player"
    ></div>
  ); */
  return (
    <div className="rounded aspect-video w-10/12 md:w-2/4">
      <video src={url} autoPlay controls></video>
    </div>
  );
};
