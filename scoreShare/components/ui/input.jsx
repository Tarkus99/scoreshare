import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
  const inputError = error
    ? "placeholder-shown:border-destructive border-destructive"
    : "placeholder-shown:border-blue-gray-200 border-primary/50";
  const labelError = error
    ? "text-destructive font-bold peer-focus:after:destructive after:border-destructive peer-focus:text-destructive"
    : "peer-focus:after:border-blue-6 peer-focus:text-gray-900 after:border-blue-700";
  return (
    <div className="relative w-full h-11 ">
      <input
        type={type}
        placeholder={props.placeholder}
        className={cn(
          "peer h-full w-full border-b bg-transparent pt-4 pb-1.5 text-primary/90 text-base font-normal outline outline-0 transition-all  focus:border-gray-500 focus:outline-0 focus-within:outline-2 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100",
          className,
          inputError
        )}
        ref={ref}
        {...props}
      />
      <label
        className={cn(
          "after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-600 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2  after:transition-transform after:duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-[2rem]  peer-focus:after:scale-x-100  peer-disabled:peer-placeholder-shown:text-blue-gray-500",
          labelError
        )}
      >
        {props.label}
      </label>
    </div>
  );
});
Input.displayName = "Input";

export { Input };
