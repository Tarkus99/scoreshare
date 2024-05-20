"use server"
import { insertVote } from "@/data/votes";
import { currentUser } from "./server";
import { resolveError } from "@/lib/error-resolver";

export const createVote = async (id, commentId, vote) => {
    const user = await currentUser();
  try {
    const voteToInsert = {
        commentId,
        vote,
        userId: user.id
    }
    const result = await insertVote(id || -1, voteToInsert);
    return result;
  } catch (error) {
     resolveError(error);
    return null;
  }
};
