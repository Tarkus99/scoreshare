"use client";
import logo from "@/public/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Social } from "./social";
import { BackButton } from "./back-button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LoadingTriangles } from "../misc/loading-triangles";
import { Manrope } from "next/font/google";

const font = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"]
})

export const CardWrapper = ({
  headerLabel,
  backButtonLabel,
  backButtonHref,
  children,
  showSocial,
  id,
  loading,
  setLoading,
}) => {
  return (
    <Card
      id={id}
      className="w-11/12 md:w-[29rem] drop-shadow-md relative font-[.8em] bg-zinc-50"
    >
      <CardHeader className="px-5 py-3 space-y-1 text-center">
        <CardTitle>
          <div className="flex items-center justify-center w-full text-center ">
            {loading ? (
              <LoadingTriangles />
            ) : (
              <Image
                id="logo-img"
                src={logo}
                alt=""
                width={75}
                height={75}
                className="transition-all aspect-square"
              />
            )}
          </div>
        </CardTitle>
        <CardDescription
          className={cn(font.className,"text-2xl antialiased text-primary/85 font-semibold")}
        >
          {headerLabel}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">{children}</CardContent>
      <CardFooter>
        {showSocial && <Social loading={loading} setLoading={setLoading} />}
      </CardFooter>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
