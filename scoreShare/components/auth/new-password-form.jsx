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
import { NewPasswordSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { AlertMessage } from "../misc/alert";
import { createPasswordReset, resetPassword } from "@/fetching";
import { PasswordInfo } from "./password-info";
import { useSearchParams } from "next/navigation";
import { useResponseMessages } from "@/hooks/use-response-messages";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
 const { setFailed, setSuccess, resetMessages, failed, success } =
   useResponseMessages();

  const form = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values) => {
    setLoading(true)
    resetMessages()
    resetPassword(values, token)
      .then((data) => {
        window.alert("");
        setSuccess(data.message);
      })
      .catch((error) => setFailed(error.response.data.message));
  };

  return (
    <CardWrapper
      headerLabel={"Enter a new password"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login"}
      id={"login-form"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="********"
                      type="password"
                      label="Password"
                      className="!text-primary text-lg"
                      error={!!form.getFieldState("password").error}
                    />
                  </FormControl>
                  <PasswordInfo error={form.getFieldState("password").error} />
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
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
              Reset password
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
