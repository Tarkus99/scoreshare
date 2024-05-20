import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { ThreeDots } from "react-loader-spinner";

export const AlertMessage = ({
  variant,
  message,
  title,
  loading,
  className,
}) => {
  if (!message) return null;
  return (
    <Alert variant={variant} className={className}>
      <AlertTitle className="flex items-center gap-x-2">
        {getIcon(variant)}
        {title}
      </AlertTitle>
      <AlertDescription>
        <div className="flex justify-between">
          <p>{message}</p>
          {loading && <ThreeDots height={30} width={30} />}
        </div>
      </AlertDescription>
    </Alert>
  );
};

function getIcon(variant) {
  if (variant === "destructive")
    return <ExclamationTriangleIcon className="w-4 h-4" />;
  if (variant === "success") return <CheckCircledIcon className="w-4 h-4 " />;
  return null;
}
