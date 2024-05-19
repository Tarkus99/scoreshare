import { ORDER_BY_POPULARITY, ORDER_BY_RECENT } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

export const OrderListItems = ({copyFiles, setCopyFiles}) => {
  const [sort, setSort] = useState(ORDER_BY_RECENT);

  const handleOrderChangeByRecent = () => {
    setSort(ORDER_BY_RECENT);
    setCopyFiles(copyFiles.toSorted((a, b) => b.uploadedAt - a.uploadedAt));
  };

  const handleOrderChangeByPopularity = () => {
    setSort(ORDER_BY_POPULARITY);
    setCopyFiles(copyFiles.toSorted((a, b) => a.uploadedAt - b.uploadedAt));
  };

  return (
    <div className="grid gap-4">
      <button
        onClick={handleOrderChangeByRecent}
        className="flex justify-between transition-all hover:underline"
      >
        <h4 className="font-medium leading-none">Recently uploaded first</h4>
        {sort === ORDER_BY_RECENT && <CheckIcon />}
      </button>
      <button
        onClick={handleOrderChangeByPopularity}
        className="flex justify-between transition-all hover:underline"
      >
        <h4 className="font-medium leading-none">Popular first</h4>
        {sort === ORDER_BY_POPULARITY && <CheckIcon />}
      </button>
    </div>
  );
};
