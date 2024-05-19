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
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { AlertMessage } from "../misc/alert";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { login } from "@/actions/login";
import { useResponseMessages } from "@/hooks/use-response-messages";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [loading, setLoading] = useState(false);
  const { failed, setFailed, success, setSuccess, resetMessages } =
    useResponseMessages();

  const form = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    resetMessages();
    setLoading(true);
    setTimeout(() => {
      login(values)
        .then((data) => {
          setSuccess(data?.success);
          setFailed(data?.error);
        })
        .catch((error) => setFailed("Something went wrong"))
        .finally(() => setLoading(false));
    }, 500);
  };

  return (
    <CardWrapper
      headerLabel={"Welcome back!"}
      backButtonLabel={"Dont have an account?"}
      showSocial
      backButtonHref={"/auth/register"}
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="******"
                      type="password"
                      className="!text-primary text-[1.4rem]"
                      label="Password"
                      error={!!form.getFieldState("password").error}
                    />
                  </FormControl>
                  <FormMessage className="text-[.8rem]" />
                  <Button
                    size="small"
                    variant="link"
                    asChild
                    className="w-full !text-[.8rem] text-right underline decoration-slate-300 hover:decoration-slate-800"
                  >
                    <Link href="/auth/reset">I dont remember my password</Link>
                  </Button>
                </FormItem>
              )}
            />
            <AlertMessage
              title={"Error"}
              variant={"destructive"}
              message={failed || urlError}
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
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
