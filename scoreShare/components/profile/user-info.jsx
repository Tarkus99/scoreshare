"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AlertMessage } from "../misc/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useUser } from "@/hooks/use-current-user";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { FaEdit } from "react-icons/fa";
import { updateProfile } from "@/fetching";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa6";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { MyManrope } from "../misc/manrope";

export const UserInfo = ({ label }) => {
  const [loading, setLoading] = useState(false);
  const {setFailed, setSuccess, failed, success, resetMessages} = useResponseMessages()
  const user = useUser();
  const { update } = useSession();
  const [avatarSrc, setAvatarSrc] = useState(user.image);
  const [image, setImage] = useState(undefined);

  const form = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      avatar: image || undefined,
      email: user.email || undefined,
      password: undefined,
      name: user.name || undefined,
    },
  });

  const onSubmit = async (values) => {
    resetMessages()
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);

    updateProfile(user.id, formData)
      .then(async (data) => {
        setSuccess(data.message);
        await update();
      })
      .catch((error) => setFailed(error.response.data.message))
      .finally(() => setLoading(false));
  };
  return (
    <Card className="w-full bg-transparent border-none rounded-sm shadow-sm h-min">
      <CardHeader className={"text-primary rounded-[2px] border-b"}>
        <p className="text-2xl font-semibold text-center uppercase !text-white text-shadow-white">
          <MyManrope>{label}</MyManrope>
        </p>
      </CardHeader>
      <CardContent className="p-2 rounded-sm bg-cyan-800/50">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="flex flex-col items-center px-2 py-5 space-y-2 rounded-sm bg-purple-50">
              <div className="flex flex-wrap items-end justify-around w-full gap-2 px-5">
                <div className="grid items-center justify-around w-full grid-cols-2 gap-x-5">
                  <span className="justify-self-end">
                    <p>Avatar image</p>
                    <div className="w-full border"></div>
                    <small className="italic">max. size: 1MB</small>
                  </span>
                  <label
                    htmlFor="avatar-image"
                    className="relative cursor-pointer w-fit"
                  >
                    <Avatar className="shadow-sm">
                      <AvatarImage src={avatarSrc} />
                      <AvatarFallback>
                        <FaUser />
                      </AvatarFallback>
                    </Avatar>
                    <FaEdit className="absolute -top-1 left-[80%] text-gray-500 text-xs" />
                  </label>
                </div>
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={loading}
                          type="file"
                          id="avatar-image"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const url = URL.createObjectURL(file);
                            setAvatarSrc(url);
                            setImage(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <div className="grid items-end justify-around w-full grid-cols-2 gap-x-5">
                <p className="justify-self-end">Name</p>
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
              </div>
              <Separator />
              <div className="grid items-end justify-around w-full grid-cols-2 gap-5">
                <p className="justify-self-end">Email</p>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={user.isOAuth}
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
              </div>
              <Separator />
              <div className="grid items-end justify-around w-full grid-cols-2 gap-5">
                <p className="justify-self-end">Password</p>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={user.isOAuth}
                          placeholder="********"
                          type="password"
                          label="Password"
                          error={!!form.getFieldState("password").error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
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
              <Button type="submit" className="!mt-5 w-fit" disabled={loading}>
                {loading && (
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                )}
                Update info
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
