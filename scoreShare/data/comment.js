import { currentUser } from "@/actions/server";
import { db } from "@/lib/db";

export const getCommentsByFileIdData = async (fileId) => {
  const user = await currentUser();

  const result = await db.comment.findMany({
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

export const insertCommentData = async (comment) => {
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

export const updateCommentData = async (id, content) => {
  const result = await db.comment.update({
    where: {
      id: id,
    },
    data: {
      content: content,
      updatedAt: new Date()
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

export const deleteCommentData = async (id) => {
  const result = await db.comment.delete({
    where: {
      id: id,
    },
  });
  return result;
};
