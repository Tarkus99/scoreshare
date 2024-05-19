import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

export const PopoverSheet = ({ label, children }) => {
  return (
    <Popover className="relative">
      <PopoverTrigger asChild>{label}</PopoverTrigger>
      <PopoverContent className="w-80" sideOffset="2" align="end">
        {children}
      </PopoverContent>
    </Popover>
  );
};
