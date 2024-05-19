"use client";

import Link from "next/link";

export const LoginButton = ({ children, mode = "redirect" }) => {
  if (mode === "modal") {
    return <span>Implement Modal</span>;
  }
  return <Link href={"/auth/login"}>{children}</Link>;
};
