"use client";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { NewTrackSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FaCircleInfo } from "react-icons/fa6";
import { AlertMessage } from "@/components/misc/alert";
import { SearchBarSpotify } from "../searchBar/search-bar-spotify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { Chip, TextField } from "@mui/material";
import { DateTime } from "luxon";
import { FaEdit } from "react-icons/fa";
import Autocomplete from "@mui/material/Autocomplete";
import Image from "next/image";
import {
  createTrack,
  getAccessTokenSpotify,
  searchArtistsInSpotify,
} from "@/fetching";
import { Separator } from "../ui/separator";
import { useResponseMessages } from "@/hooks/use-response-messages";
import { LoadingButton } from "../misc/loading-button";
import { MySelect } from "../misc/my-select";
import {
  ALLOWED_TYPES,
  INSTRUMENTS,
  KEY_LIST,
  MAX_FILE_SIZE,
  removeExtensionFromFileNameInForm,
} from "@/lib/utils";

import { BadgeSelector } from "../misc/badge-selector";
let timeOut;

export const CreateTrackForm = () => {
  const [loading, setLoading] = useState(false);
  const { success, failed, setFailed, setSuccess, resetMessages } =
    useResponseMessages();

  const [imageSrc, setImageSrc] = useState(undefined);
  const [disabled, setDisabled] = useState(false);
  const [artists, setArtists] = useState([]);

  const keyModeRef = useRef();
  const keyAlterRef = useRef();

  const setKeyMode = (value) => {
    keyModeRef.current = value;
  };
  const setAlterMode = (value) => {
    keyAlterRef.current = value;
  };

  const form = useForm({
    resolver: yupResolver(NewTrackSchema),
    defaultValues: {
      id: "",
      name: "",
      source: "",
      artist: [],
      tempo: 60,
      key: "",
      date: DateTime.local(),
      image: undefined,
      file: undefined,
      fileName: "",
      instrument: "",
    },
  });

  const onSubmit = (values) => {
    resetMessages();
    const formData = new FormData();
    formData.append("id", values.id);
    formData.append("name", values.name);
    formData.append("source", values.source);
    formData.append(
      "artist",
      JSON.stringify(
        values.artist.map((a) => {
          return { id: a.id, name: a.name, link: a.external_urls.spotify };
        })
      )
    );
    formData.append("tempo", values.tempo);
    formData.append("key", `${values.key}${keyAlterRef.current || ""} ${keyModeRef.current || "major"}`);
    formData.append("date", new Date(values.date).toISOString());
    formData.append("image", values.image);
    formData.append("fileName", values.fileName);
    formData.append("file", values.file);
    formData.append("instrument", values.instrument);
    setLoading(true);
    setDisabled(true);
    createTrack(formData)
      .then((data) => {
        resetForm();
        setSuccess(data.message);
      })
      .catch((error) => {
        setFailed(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const searchArtists = async (query) => {
    try {
      const data = await searchArtistsInSpotify(
        query,
        localStorage.getItem("spotify_access_token")
      );
      return data.artists.items;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const token = await getAccessTokenSpotify();
        localStorage.setItem(
          "spotify_access_token",
          token.access_token.toString()
        );
        return searchArtists(query);
      } else if (error.response && error.response.status === 400) {
        return [];
      }
    }
  };

  const resetAll = () => {
    resetForm();
    resetMessages();
  };

  const resetForm = () => {
    form.reset();
    setDisabled(false);
    setImageSrc("");
  };

  return (
    <div className="relative w-full p-5 rounded-sm bg-zinc-50 sm:w-11/12 md:w-10/12 xl:w-4/6">
      <div className="relative">
        <Button
          variant="destructive"
          className="absolute right-1 bottom-1"
          onClick={() => {
            resetAll();
          }}
        >
          Clear
        </Button>
        <h1 className="w-3/5 pb-2 text-base font-semibold tracking-tight border-b text-primary/80 border-destructive text-balance md:w-10/12 md:text-3xl scroll-m-20 first:mt-0">
          create new track and start uploading files!
        </h1>
      </div>
      <div className="mt-2 mb-5 space-y-1 ">
        {headerTooltip()}
        <div>
          <SearchBarSpotify
            setTrackField={form.setValue}
            setImageSrc={setImageSrc}
            setDisabled={setDisabled}
          />
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={disabled || loading}
                      className="truncate"
                      placeholder="Track 1"
                      type="text"
                      label="Title"
                      error={!!form.getFieldState("name").error}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={disabled || loading}
                      placeholder="Album, concert, performance, ..."
                      className="truncate"
                      type="text"
                      label="Source"
                      error={!!form.getFieldState("source").error}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="artist"
              control={form.control}
              render={({ field }) => {
                return (
                  <Autocomplete
                    {...field}
                    className="w-full md:w-2/4"
                    disablePortal
                    value={form.getValues("artist")}
                    onBlur={() => setArtists([])}
                    ListboxProps={{
                      style: {
                        maxHeight: "15rem",
                        backgroundColor: "rgb(224 231 255)",
                        border: "2px solid rgb(34 197 94)",
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "1px",
                      },
                    }}
                    disabled={disabled || loading}
                    multiple
                    options={artists}
                    getOptionLabel={(option) => option.name ?? option}
                    isOptionEqualToValue={(option, value) => {
                      const optionName =
                        typeof option === "string" ? option : option.name;
                      const valueName =
                        typeof value === "string" ? value : value.name;
                      return optionName === valueName;
                    }}
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((option, index) => {
                        const label =
                          typeof option === "string" ? option : option.name;
                        return (
                          <Chip
                            {...getTagProps({ index })}
                            label={label}
                            key={uuidv4()}
                          />
                        );
                      });
                    }}
                    renderOption={(props, option) => {
                      return (
                        <li
                          {...props}
                          key={uuidv4() + uuidv4()}
                          className="flex justify-center items-center gap-8 p-1 rounded-[2px] bg-gradient-to-l odd:from-slate-100 odd:to-slate-200 even:from-zinc-100 even:to-zinc-100 hover:bg-purple-100 hover:border-indigo-100 hover:shadow-inner cursor-pointer"
                        >
                          {option.name}
                          <Image
                            alt=""
                            src={
                              option.images && option.images.length > 0
                                ? option.images.slice(-1)[0].url
                                : "/defaultUser.png"
                            }
                            width={64}
                            height={24}
                            className="h-auto rounded-full aspect-square"
                            quality={100}
                            key={uuidv4()}
                          />
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onInput={async (e) => {
                          if (timeOut) clearTimeout(timeOut);

                          timeOut = setTimeout(async () => {
                            const query = e.target.value;
                            const data = await searchArtists(query);
                            setArtists(data);
                          }, 450);
                        }}
                        label="Search or type an artist"
                        placeholder="Imagine Dragons"
                      />
                    )}
                    onChange={(e, values) => {
                      form.setValue("artist", values);
                      e.target.value = [];
                    }}
                  />
                );
              }}
            />

            {!!form.getFieldState("artist").error && (
              <FormMessage>
                {form.getFieldState("artist").error.message}
              </FormMessage>
            )}

            <div className="flex flex-col gap-5 md:flex-row md:gap-0">
              <div className="flex flex-col w-full space-y-3 justify-stretch">
                <LocalizationProvider
                  dateAdapter={AdapterLuxon}
                  adapterLocale="es"
                >
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl className="w-full">
                          <DatePicker
                            {...field}
                            inputFormat="DD/MM/YYYY"
                            disabled={disabled || loading}
                            error={!!form.getFieldState("date").error}
                            sx={{ width: 260 }}
                            openTo="year"
                            slotProps={{
                              field: {
                                clearable: true,
                                onClear: () => form.setError("date", null),
                              },
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </LocalizationProvider>
                <div className="flex items-end w-full">
                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <MySelect
                          disabled={loading}
                          onValueChange={field.onChange}
                          defaultValue={null}
                          value={field.value}
                          error={!!form.getFieldState("key").error}
                          className="w-full "
                          array={KEY_LIST}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-full w-fit border-primary/50">
                              <SelectValue
                                placeholder={"Select the key of the track"}
                              />
                            </SelectTrigger>
                          </FormControl>
                        </MySelect>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-x-2">
                  <div className="flex gap-x-2 ">
                    <BadgeSelector
                      name={"alter"}
                      label={"~"}
                      id={"none"}
                      value={""}
                      checked={true}
                      handleClick={setAlterMode}
                    />
                    <BadgeSelector
                      name={"alter"}
                      label={"#"}
                      id={"sharp"}
                      value={"#"}
                      handleClick={setAlterMode}
                    />
                    <BadgeSelector
                      name={"alter"}
                      label={"b"}
                      id={"flat"}
                      value={"b"}
                      handleClick={setAlterMode}
                    />
                  </div>
                  <div className="flex gap-x-2 ">
                    <BadgeSelector
                      name={"key"}
                      label={"Major"}
                      id={"major"}
                      value={"major"}
                      checked={true}
                      handleClick={setKeyMode}
                    />
                    <BadgeSelector
                      name={"key"}
                      label={"Minor"}
                      id={"minor"}
                      value={"minor"}
                      handleClick={setKeyMode}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="tempo"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <TextField
                          {...field}
                          disabled={loading}
                          onChange={field.onChange}
                          id="standard-number"
                          label="BPM"
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-wrap items-end justify-end w-full gap-2">
                <FormLabel>Track image: </FormLabel>
                <label
                  htmlFor="track-image"
                  className="relative cursor-pointer aspect-square min-w-24 w-[16vw]"
                >
                  <FaEdit className="absolute -top-1 left-[94%] text-sm z-10" />
                  <Image
                    src={imageSrc || "/Croquis.jpg"}
                    alt=""
                    width={300}
                    height={300}
                    className="absolute inset-0 w-full h-full rounded-sm shadow-md"
                  />
                </label>

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { name, ref, onBlur, ...fieldd } }) => {
                    return (
                      <FormItem className="w-full">
                        <FormControl>
                          <div className="hidden">
                            <input
                              disabled={disabled || loading}
                              type="file"
                              id="track-image"
                              accept="image/png, image/jpeg"
                              name={name}
                              ref={ref}
                              onBlur={onBlur}
                              onChange={(e) => {
                                if (e.target.files[0].size > 4000000) {
                                  form.setError("image", {
                                    type: "manual",
                                    message: "Image size cannot exceed 4MB!",
                                  });
                                  return;
                                }
                                const file = e.target.files[0];
                                setImageSrc(URL.createObjectURL(file));
                                //form.setValue("image", file);
                                fieldd.onChange(file);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="w-full text-right" />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <Separator />
            <div>
              <span className="w-[100%] relative !h-min flex items-center">
                <TooltipProvider className="w-full">
                  <Tooltip className="!w-2/4">
                    <TooltipTrigger>
                      <FaCircleInfo
                        color="rgba(42,42,42,.4)"
                        className="!min-w-[12px] !aspect-square !w-[1rem]"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="absolute left-[100%] w-max bottom-[100%] text-[.6rem] max-w-[90vw]">
                      <p>
                        On first creating a track, it is mandatory to attach a
                        file to it!
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              <h1 className="text-lg font-semibold">
                Choose the file to upload:
              </h1>
              <div className="flex flex-col mt-2 gap-y-2">
                <div className="flex flex-col flex-wrap md:flex-row gap-y-2 md:items-center md:gap-x-4">
                  <FormMessage className="w-full">
                    {form.getFieldState("file").error?.message}
                  </FormMessage>
                  <Controller
                    control={form.control}
                    name="file"
                    render={({ field: { name, ref, onBlur, ...fieldd } }) => (
                      <>
                        <label
                          htmlFor="file-upload"
                          className="block px-4 py-2 text-center text-white transition-all rounded-full shadow-md cursor-pointer h-min w-fit bg-cyan-800 hover:bg-cyan-700 whitespace-nowrap"
                        >
                          Choose a file
                        </label>
                        <input
                          id="file-upload"
                          className="w-full truncate "
                          type="file"
                          name={name}
                          ref={ref}
                          onBlur={onBlur}
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
                      </>
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
                        <FormDescription>
                          Using any of these characters in the file name will
                          cause an error:
                          {`\` ~ # % ^ | < > [ ] { } \ "`}
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex w-full">
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
                          className="w-full"
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
              </div>
            </div>
            <AlertMessage
              title={"Error"}
              variant={"destructive"}
              message={failed}
              className={" fixed bottom-4 animate-alert-message right-4 w-fit"}
            />
            <AlertMessage
              title={"Succes!"}
              variant={"success"}
              message={success}
              loading={true}
              className={" fixed bottom-4 animate-alert-message-disappears right-4 w-fit"}
            />
            <LoadingButton
              className="w-full rounded-full"
              loading={loading}
              label="Create track"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

function headerTooltip() {
  return (
    <span className="w-[100%] relative !h-min flex items-center">
      <TooltipProvider className="w-full">
        <Tooltip className="!w-2/4">
          <TooltipTrigger>
            <FaCircleInfo
              color="rgba(42,42,42,.4)"
              className="!min-w-[12px] !aspect-square !w-[1rem]"
            />
          </TooltipTrigger>
          <TooltipContent className="absolute left-[100%] w-max bottom-[100%] text-[.6rem] max-w-[90vw]">
            <p>
              You can select an existing song in Spotify and inject the
              information directly or create a blank new track.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
}
