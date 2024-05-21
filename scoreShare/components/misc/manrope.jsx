import { Manrope } from "next/font/google";
import React from "react";

const font = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const MyManrope = ({ children }) => {
  return <span className={font.className}>{children}</span>;
};
