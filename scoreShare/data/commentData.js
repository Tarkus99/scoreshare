import { currentUser } from "@/actions/server";
import { db } from "@/lib/db";

export const getCommentsByFileId = async (fileId) => {
  const user = await currentUser();
  const prisma = db.$extends({
    result: {
      comment: {
        hasUserVoted: {
          needs: { votes: true },
          compute(comment) {
            return comment.votes.find((v) => v.userId === user.id);
          },
        },
        totalVotes: {
          needs: { votes: true },
          compute(comment) {
            return comment.votes.length;
          },
        },
        rating: {
          needs: { votes: true },
          compute(comment) {
            return comment.votes.reduce((acc, v) => acc + v.vote, 0);
          },
        },
      },
    },
  });
  const result = await prisma.comment.findMany({

    where: {
      fileId: fileId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      votes: true,
    },
  });

  return result;
};

export const insertComment = async (comment) => {
  const result = await db.comment.create({
    data: comment,
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return result;
};

export const updateComment = async (id, content) => {
  const result = await db.comment.update({
    where: {
      id: id,
    },
    update: {
      content: content,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return result;
};

export const deleteComment = async (id) => {
  const result = await db.comment.delete({
    where: {
      id: id,
    },
  });
  return result;
};
