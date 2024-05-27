import { db } from "@/lib/db";

export const insertVoteData = async (id, vote) => {
  const result = await db.voteInFile.upsert({
    where: {
      id: id,
    },
    update: {
      vote: vote.vote,
      updatedAt: new Date(),
    },
    create: vote,
  });
  return result;
};