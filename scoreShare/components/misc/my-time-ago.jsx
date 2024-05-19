"use client";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
TimeAgo.addDefaultLocale(en);

export const MyTimeAgo = ({ date }) => {
  return <ReactTimeAgo className="text-muted-foreground" locale="en-US" date={new Date(date)} />;
};
