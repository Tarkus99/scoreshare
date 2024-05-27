"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="text-white bg-indigo-600 w-min order-3 col-start-1 row-start-1 justify-self-end"
    >
      Add
    </Button>
  );
}
