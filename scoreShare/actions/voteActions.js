"use server"
import { insertVote } from "@/data/votes";
import { currentUser } from "./server";

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
    console.log(error);
    return null;
  }
};
