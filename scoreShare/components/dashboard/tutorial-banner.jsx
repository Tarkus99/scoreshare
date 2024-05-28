"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { TutorialItem } from "./tutorial-item";
import { Semibold } from "./semibold";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export const TutorialBanner = () => {
  return (
    <Link href="/dashboard/tutorial" className="group mt-2 block relative">
      <div className="px-5 py-2 bg-cyan-800/40 rounded text-white flex justify-between items-center z-50 relative">
        <h1 className="text-2xl group-hover:underline transition-all">New here?</h1>
        <FaArrowRight color="white" className="group-hover:scale-125 transition-all"/>
      </div>
      <div className="absolute top-0 bottom-0 bg-gradient-to-r to-emerald-500 from-emerald-300/80 w-0 group-hover:w-full h-[100%] transition-all duration-700 z-0 rounded"></div>
    </Link>
  );
};
