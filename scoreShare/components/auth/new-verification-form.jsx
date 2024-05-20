"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { ThreeDots } from "react-loader-spinner";
import { useSearchParams } from "next/navigation";
import { verifyUser } from "@/fetching";
import { AlertMessage } from "../misc/alert";
import { useResponseMessages } from "@/hooks/use-response-messages";

export const NewVerificationForm = () => {
  const { setFailed, failed, setSuccess, success, resetMessages } =
    useResponseMessages();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || failed) return;
    if (!token) {
      setFailed("Missing token!");
    } else {
      verifyUser(token)
        .then((_) => {
          setSuccess("Email verified");
        })
        .catch((error) => {
          setFailed(error.response.data.message);
        });
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex flex-col items-center justify-center w-full">
        {!success && !failed && <ThreeDots />}
        <AlertMessage
          title={"Unexpected error."}
          variant="destructive"
          message={failed}
        />
        <AlertMessage title={"Success"} variant="success" message={success} />
      </div>
    </CardWrapper>
  );
};
