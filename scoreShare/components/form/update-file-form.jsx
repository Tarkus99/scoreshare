import { UpdateFile } from "@/schemas";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { SelectTrigger, SelectValue } from "../ui/select";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertMessage } from "../misc/alert";
import { LoadingButton } from "../misc/loading-button";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { MySelect } from "../misc/my-select";
import {
  ALLOWED_TYPES,
  INSTRUMENTS,
  MAX_FILE_SIZE,
  removeExtensionFromFileNameInForm,
} from "@/lib/utils";
import { putFile } from "@/actions/fileActions";

export const UpdateFileForm = ({ file, addFile }) => {
  const [loading, setLoading] = useState(false);
  const { success, failed, setFailed, setSuccess, resetMessages } =
    useResponseMessages();
  const form = useForm({
    resolver: yupResolver(UpdateFile),
    defaultValues: {
      instrument: file.instrument || undefined,
      fileName: file.name || undefined,
      file: undefined,
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    resetMessages();
    const formData = new FormData();
    if (values.file) formData.append("file", values.file);
    formData.append("name", values.fileName);
    formData.append("instrument", values.instrument);

    const data = await putFile(file.id, formData, file.url);
    if (data.success) {
      setSuccess(data.message);
      addFile(data.payload);
    } else {
      setFailed(data.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className="flex flex-col space-y-5">
            <Controller
              control={form.control}
              name="file"
              render={({ field: { name, ref, onBlur, ...fieldd } }) => (
                <div>
                  <label
                    htmlFor="file-upload"
                    className="block px-4 py-2 text-center text-white transition-all rounded-full shadow-md cursor-pointer h-min w-fit bg-mypurple hover:bg-purple-700 whitespace-nowrap"
                  >
                    Choose a file
                  </label>
                  <input
                    className="w-full truncate"
                    type="file"
                    id="file-upload"
                    name={name}
                    ref={ref}
                    onBlur={onBlur}
                    disabled={loading}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file.size > MAX_FILE_SIZE) {
                        form.setError("file", {
                          type: "manual",
                          message: "File size cannot exceed 4MB!",
                        });
                        return;
                      }
                      if (!ALLOWED_TYPES.includes(file.type)) {
                        form.setError("file", {
                          type: "manual",
                          message:
                            "File extension must be one of: mp3, mp4 or pdf!",
                        });
                        return;
                      }
                      form.setValue(
                        "fileName",
                        removeExtensionFromFileNameInForm(file.name)
                      );
                      fieldd.onChange(file);
                    }}
                  />
                  <FormMessage>
                    {form.getFieldState("file").error?.message}
                  </FormMessage>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="fileName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      className="w-full"
                      placeholder="Set how users will see the file"
                      type="text"
                      label="Filename"
                      error={!!form.getFieldState("fileName").error}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Using any of these characters in the file name will cause an
                    error:
                    {`\` ~ # % ^ | < > [ ] { } \ "`}
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-end w-full">
              <FormField
                control={form.control}
                name="instrument"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <MySelect
                      disabled={loading}
                      onValueChange={field.onChange}
                      defaultValue={null}
                      value={field.value}
                      error={!!form.getFieldState("instrument").error}
                      className=""
                      array={INSTRUMENTS}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border-primary/50">
                          <SelectValue
                            placeholder={
                              "Select the instrument for which the above arrangement is intended to be."
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                    </MySelect>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <LoadingButton
              loading={loading}
              className="self-end "
              label="Upload file"
            />
          </div>
        </form>
      </Form>
      <Separator className="my-2" />
      <AlertMessage title={"Error"} variant={"destructive"} message={failed} />
      <AlertMessage
        title={"Succes!"}
        variant={"success"}
        message={success}
        loading={true}
      />
    </div>
  );
};
