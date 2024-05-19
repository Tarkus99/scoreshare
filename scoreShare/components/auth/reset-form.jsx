"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ResetSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { AlertMessage } from "../misc/alert";
import { createPasswordReset } from "@/fetching";
import { useResponseMessages } from "@/hooks/use-response-messages";

export const ResetForm = () => {
  const [loading, setLoading] = useState(false);
  const {setFailed, setSuccess, resetMessages, failed, success} = useResponseMessages()

  const form = useForm({
    resolver: yupResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    resetMessages()
    createPasswordReset(values)
      .then((data) => setSuccess(data.message))
      .catch((error) => setFailed(error.response.data.message));
  };

  return (
    <CardWrapper
      headerLabel={"Forgot your password?"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login"}
      id={"login-form"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="john@doe.com"
                      type="email"
                      color="purple"
                      variant="standard"
                      label="Email"
                      className="!text-primary"
                      error={!!form.getFieldState("email").error}
                    />
                  </FormControl>
                  <FormMessage className="text-[.8rem]" />
                </FormItem>
              )}
            />

            <AlertMessage
              title={"Error"}
              variant={"destructive"}
              message={failed}
            />
            <AlertMessage
              title={"Succes!"}
              variant={"success"}
              message={success}
              loading={true}
            />
            <Button
              onClick={(e) => {
                document
                  .querySelector("#logo-img")
                  .classList.add("rotate-logo");
                setTimeout(() => {
                  document
                    .querySelector("#logo-img")
                    .classList.remove("rotate-logo");
                }, 1000);
              }}
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
              Send reset email
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
