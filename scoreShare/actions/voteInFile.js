"use server";
import { insertVoteData } from "@/data/voteInFile";
import { currentUser } from "./server";
import { resolveError } from "@/lib/error-resolver";
import { revalidatePath } from "next/cache";

export const createVoteInFile = async (id, fileId, vote) => {
  const user = await currentUser();
  try {
    const voteToInsert = {
      fileId,
      vote,
      userId: user.id,
    };
    const result = await insertVoteData(id || -1, voteToInsert);
    revalidatePath("/(protected)/track/[id]", "page")
    return result;
  } catch (error) {
    resolveError(error);
    return null;
  }
};