import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PopoverSheet } from "../misc/popover-sheet";
import { Button } from "../ui/button";
import { FaSort } from "react-icons/fa6";
import { SelectTrigger, SelectValue } from "../ui/select";
import { MySelect } from "../misc/my-select";
import { INSTRUMENTS } from "@/lib/utils";
import { OrderListItems } from "./order-list-items";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { MyManrope } from "../misc/manrope";

export const FileTableFilters =({
  originalFiles,
  copyFiles,
  setCopyFiles,
  children,
  filtersRef
}) => {

  const handleFilterChange = () => {
    let filtered = originalFiles;
    if (filtersRef.instrument.current)
      filtered = filtered.filter(
        (file) => file.instrument === filtersRef.instrument.current
      );

    if (filtersRef.media.current)
      filtered = filtered.filter(
        (file) => file.url.split(".").pop() === filtersRef.media.current
      );

    setCopyFiles(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [originalFiles]);

  const [open, setOpen] = useState(undefined);

  return (
    <div className="flex flex-wrap items-end justify-end w-full gap-4 p-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger onClick={() => setOpen(true)}>
          <Button variant="outline">Filters</Button>
        </SheetTrigger>
        <SheetContent className="!p-0 flex flex-col justify-center h-full !bg-transparent backdrop-blur-sm">
          <SheetHeader>
            <SheetTitle className="text-xl text-center text-white uppercase">
              <MyManrope> Filter files:</MyManrope>
            </SheetTitle>
            <Separator></Separator>
          </SheetHeader>
          <SheetDescription className="flex flex-col justify-start w-full h-auto px-4 py-8 rounded shadow-md filter-parent gap-y-10">
            <MySelect
              array={["All", "mp3", "mp4", "pdf"]}
              onValueChange={(value) => {
                filtersRef.media.current = value === "All" ? null : value;
                handleFilterChange();
                setOpen(false);
              }}
              defaultValue={filtersRef.media.current || undefined}
            >
              <SelectTrigger className="w-full border-primary/50 bg-slate-50 text-primary/90">
                <SelectValue placeholder={"Search files by media type"} />
              </SelectTrigger>
            </MySelect>
            <PopoverSheet
              label={
                <Button
                  variant="null"
                  className="w-full !text-start rounded-full"
                >
                  <span className="text-lg text-white">Sort By</span>{" "}
                  <FaSort color="white" />
                </Button>
              }
            >
              <OrderListItems
                copyFiles={copyFiles}
                setCopyFiles={setCopyFiles}
                setOpen={setOpen}
                sort={filtersRef.sort}
              />
            </PopoverSheet>
            <Autocomplete
              disablePortal
              options={INSTRUMENTS}
              sx={{ width: "100%" }}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => {
                return option === value;
              }}
              onChange={(e) => {
                const text = e.target.innerText;
                filtersRef.instrument.current = text || null;
                handleFilterChange();
                setOpen(false);
              }}
              defaultValue={filtersRef.instrument.current}
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
                    "& .MuiInputLabel-standard": {
                      color: "whitesmoke",
                      borderColor: "white",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
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
          </SheetDescription>
        </SheetContent>
      </Sheet>
      {children}
    </div>
  );
};
