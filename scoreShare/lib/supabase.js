"use server";
import { currentUser } from "@/actions/server";
import { createClient } from "@supabase/supabase-js";
import { Erica_One } from "next/font/google";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export const supUploadAvatar = async (image) => {
  const user = await currentUser();
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(user.id + "_avatar", image, {
      upsert: true,
    });
  return {data, error};
};

export const supUploadImage = async (image) => {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(image.name, image, {
      upsert: true,
    });
  return {data, error};
};

export const supUploadFile = async (file, name) => {
  const user = await currentUser();

  const { data, error } = await supabase.storage
    .from("files")
    .upload(name, file);
  return { data, error };
};

export const supGetPublicUrl = async (bucket, fileInfo) => {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileInfo);
  return publicUrl;
};

export const supMoveFile = async (oldName, newName) => {
  const { data, error } = await supabase.storage
    .from("files")
    .move(oldName, newName);
  return { data, error };
};

export const supDownloadFile = async (name) => {
  const { data, error } = await supabase.storage.from("files").download(name);
  return { data, error };
};

export const supDeleteFile = async (url) => {
  const { data, error } = await supabase.storage.from("files").remove([url]);
  return {data, error};
};
