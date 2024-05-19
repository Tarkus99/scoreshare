import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { PopoverSheet } from "../misc/popover-sheet";
import { Button } from "../ui/button";
import { FaSort } from "react-icons/fa6";
import { SelectTrigger, SelectValue } from "../ui/select";
import { MySelect } from "../misc/my-select";
import { INSTRUMENTS, ORDER_BY_POPULARITY, ORDER_BY_RECENT } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { OrderListItems } from "./order-list-items";

export const FileTableFilters = ({
  originalFiles,
  copyFiles,
  setCopyFiles,
  children,
}) => {
  const instrument = useRef(null);
  const media = useRef(null);

  const handleFilterChange = () => {
    let filtered = originalFiles;
    if (instrument.current)
      filtered = filtered.filter(
        (file) => file.instrument === instrument.current
      );

    if (media.current)
      filtered = filtered.filter(
        (file) => file.url.split(".").pop() === media.current
      );

    setCopyFiles(filtered);
  };

  useEffect(()=>{
    handleFilterChange();
  }, [originalFiles])

  return (
    <div className="flex flex-wrap items-end justify-end w-full gap-4 p-2">
      <MySelect
        array={["All", "mp3", "mp4", "pdf"]}
        onValueChange={(value) => {
          media.current = value === "All" ? null : value;
          handleFilterChange();
        }}
      >
        <SelectTrigger className="w-fit border-primary/50 bg-slate-50">
          <SelectValue placeholder={"Search files by media type"} />
        </SelectTrigger>
      </MySelect>
      <PopoverSheet
        label={
          <Button variant="null" className="rounded-full">
            <FaSort color="white" />
          </Button>
        }
      >
        <OrderListItems copyFiles={copyFiles} setCopyFiles={setCopyFiles} />
      </PopoverSheet>
      <Autocomplete
        disablePortal
        options={INSTRUMENTS}
        sx={{ maxWidth: "15rem", width: 300 }}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => {
          return option === value;
        }}
        onChange={(e) => {
          const text = e.target.innerText;
          instrument.current = text || null;
          handleFilterChange();
        }}
        renderInput={(params) => (
          <TextField
            variant="standard"
            {...params}
            label="Search by instrument"
            sx={{
              "& .MuiInput-root": {
                color: "white",
                fontFamily: "inherit",
                // Bottom border
                "&:before": {
                  borderColor: "lightgray",
                },
                "&:after": {
                  borderColor: "white",
                  borderWidth: "1px",
                },
              },
              // Label
              "& .MuiInputLabel-standard": {
                color: "whitesmoke",
                borderColor: "white",
              },
              "& ..MuiInputLabel-standard": {
                color: "whitesmoke",
                borderColor: "white",
              },
              "& .MuiButtonBase-root": {
                color: "lightgray",
              },
            }}
          />
        )}
      />
      {children}
    </div>
  );
};
