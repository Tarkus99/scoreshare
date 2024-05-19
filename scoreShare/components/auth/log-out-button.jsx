"use client";

import { signOut } from "next-auth/react";
import React from "react";

export const LogOutButton = ({ children }) => {
  const onClick = () => {
    signOut();
  };
  return <span onClick={onClick}>{children}</span>;
};
