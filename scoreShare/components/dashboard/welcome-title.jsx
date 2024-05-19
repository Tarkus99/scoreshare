"use client";

import { useUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import React from "react";
const font = Manrope({
  subsets: ["latin"],
  weight: ["400"],
});

export const WelcomeTitle = () => {
  const user = useUser();
  return (
    <h1 className={cn(font.className,"w-full text-4xl font-semibold text-white border-b-2 border-white")}>
      Welcome {user.name}
    </h1>
  );
};
