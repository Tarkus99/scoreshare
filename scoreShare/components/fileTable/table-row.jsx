import { cn } from "@/lib/utils";
import React from "react";

export const TableRow = ({ className, children, onClick }) => {
  return (
    <div
      className={cn(
        "grid cursor-pointer grid-cols-[70%_30%] justify-items-start auto-cols-min md:grid-cols-[50%_25%_25%] p-2 text-center items-center mx-auto  transition-all animate-comment  text-white",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
