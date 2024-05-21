"use server";
import { getPopularTracksData, getRecentTracksData } from "@/data/track";
import { resolveError } from "@/lib/error-resolver";

export const getPopularTracks = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2250));
  try {
    const result = await getPopularTracksData();
    return result;
  } catch (error) {
    resolveError(error);
    return [];
  }
};

export const getRecentTracks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2250));
  try {
    const result = await getRecentTracksData();
    return result;
  } catch (error) {
    resolveError(error);
    return [];
  }
};