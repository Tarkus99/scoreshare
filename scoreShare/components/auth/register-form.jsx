"use client";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RegisterSchema } from "@/schemas";
import { register } from "@/fetching";
import { Input } from "../ui/input";
import { FaCircleInfo } from "react-icons/fa6";
import { AlertMessage } from "../misc/alert";
import { PasswordInfo } from "./password-info";
import { useResponseMessages } from "@/hooks/use-response-messages";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { failed, setFailed, success, setSuccess, resetMessages } =
    useResponseMessages();

  const form = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values) => {
    resetMessages();
    setLoading(true);

    register(values)
      .then((data) => {
        setSuccess(data.message);
      })
      .catch((error) => {
        setFailed(error.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <CardWrapper
      headerLabel={"Create an account"}
      backButtonLabel={"Already have an account?"}
      showSocial
      backButtonHref={"/auth/login"}
      id={"register-form"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="John Doe"
                      type="text"
                      label="Name"
                      error={!!form.getFieldState("name").error}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      label="Email"
                      error={!!form.getFieldState("email").error}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="******"
                      type="password"
                      color="deep-purple"
                      variant="standard"
                      label="Password"
                      error={!!form.getFieldState("password").error}
                    />
                  </FormControl>
                  <p
                    className={"items-start text-[.7rem] gap-2 hidden md:flex"}
                  >
                    <PasswordInfo
                      error={form.getFieldState("password").error}
                    />
                  </p>
                  <span className="hidden peer:focus:block absolute top-0 z-100 md:hidden left-[30%]">
                    <TooltipProvider>
                      <Tooltip className="!w-2/4">
                        <TooltipTrigger>
                          <FaCircleInfo color="rgba(42,42,42,.4)" />
                        </TooltipTrigger>
                        <TooltipContent className="w-2/4">
                          <p>
                            Use at least 8 characters, one uppercase, one
                            lowercase and one number.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
              Create an account
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
