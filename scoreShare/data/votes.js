import { db } from '@/lib/db';

export const insertVote = async(id, vote) => {
    const result = await db.voteInComment.upsert({
        where: {
            id: id,
        },
        update: {
            vote: vote.vote,
            updatedAt: new Date()
        },
        create: vote
    })
  return result;
}
