import React, { memo } from "react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export const LoadingButton = memo(({ loading, className, label }) => {
  return (
    <Button type="submit" className={className} disabled={loading}>
      {loading && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
      {label}
    </Button>
  );
});
