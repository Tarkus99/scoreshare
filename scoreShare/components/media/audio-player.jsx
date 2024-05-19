import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
export const MyAudioPlayer = ({ url }) => {
  return <AudioPlayer src={url} controls />;
};
