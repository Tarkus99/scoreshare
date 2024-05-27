import { ORDER_BY_POPULARITY, ORDER_BY_RECENT } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";

export const OrderListItems = ({ copyFiles, setCopyFiles, setOpen, sort }) => {

  const handleOrderChange = async (value, algo) => {
    sort.current = value;
    setCopyFiles(copyFiles.toSorted(algo));
    await new Promise((resolve) => setTimeout(resolve, 250));
    setOpen(false);
  };

  const recent = (a, b) => b.uploadedAt - a.uploadedAt;
  const popular = (a, b) => a.rating - b.rating;

  return (
    <div className="grid gap-4 text-primary/90">
      <button
        onClick={() => handleOrderChange(ORDER_BY_RECENT, recent)}
        className="flex justify-between transition-all hover:underline"
      >
        <h4 className="font-medium leading-none">Recently uploaded first</h4>
        {sort.current === ORDER_BY_RECENT && <CheckIcon />}
      </button>
      <button
        onClick={() => handleOrderChange(ORDER_BY_POPULARITY, popular)}
        className="flex justify-between transition-all hover:underline"
      >
        <h4 className="font-medium leading-none">Popular first</h4>
        {sort.current === ORDER_BY_POPULARITY && <CheckIcon />}
      </button>
    </div>
  );
};
