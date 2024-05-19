"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
export const BackButton = ({ label, href }) => {
  return (
    <Button variant="link" asChild size="md" className="w-full">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
