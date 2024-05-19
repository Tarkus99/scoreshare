import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React, { forwardRef } from "react";

const inputVariants = cva(
  "order-2 h-auto w-full p-1 text-2xl md:text-base rounded-full outline-transparent md:w-full ps-10 drop-shadow-sm text-primary dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white peer",
  {
    variants: {
      variant: {
        navbar: "w-0 drop-shadow-lg",
        form: " py-2 focus-visible:ring-1 md:focus-visible:ring-2 ring-cyan-500 drop-shadow-md",
        default: "py-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const InputSearchBar = forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <input
      className={cn(inputVariants({ variant, className }))}
      {...props}
      ref={ref}
    />
  );
});

export { InputSearchBar };
