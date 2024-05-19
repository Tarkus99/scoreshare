import React from "react";
import { Badge } from "../ui/badge";

export const BadgeSelector = ({ name, id, label, value, handleClick, checked = false}) => {
  return (
    <div>
      <input
        type="radio"
        className="hidden peer"
        name={name}
        id={id}
        defaultChecked={checked}
      />
      <label
        htmlFor={id}
        tabIndex={0}
        className="cursor-pointer opacity-40 badge peer-checked:opacity-100"
        onClick={() => handleClick(value)}
      >
        <Badge className="bg-transparent text-primary/80 border-[1px] border-indigo-500 min-w-6 min-h-6 hover:bg-indigo-300">
          {label}
        </Badge>
      </label>
    </div>
  );
};
