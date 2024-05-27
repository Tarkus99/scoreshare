"use server"
import { insertVoteCommentData } from "@/data/voteInComment";
import { currentUser } from "./server";
import { resolveError } from "@/lib/error-resolver";

export const createVoteInComment = async (id, commentId, vote) => {
    const user = await currentUser();
  try {
    const voteToInsert = {
        commentId,
        vote,
        userId: user.id
    }
    const result = await insertVoteCommentData(id || -1, voteToInsert);
    return result;
  } catch (error) {
     resolveError(error);
    return null;
  }
};
