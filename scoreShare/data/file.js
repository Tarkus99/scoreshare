import { db } from "@/lib/db";

export const getFileByIdData = async (id) => {
  const file = await db.file.findUnique({
    where: { id },
  });
  return file;
};

export const getFilesByTrackIdData = async (id) => {
  const files = await db.file.findMany({
    orderBy: [
      {
        uploadedAt: "desc",
      },
    ],
    where: {
      trackId: id,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      votes: true
    },
  });
  return files;
};

export const getFilesByUserIdData = async (id) => {
  const files = await db.file.findMany({
    orderBy: [
      {
        uploadedAt: "desc",
      },
    ],
    where: {
      userId: id,
    },
    include: {
      track: {
        include: {
          _count: {
            select: {
              files: true
            }
          }
        }
      },

      _count: {
        select: {
          comments: true,
        },
      },
      votes: true
    },
  });
  return files;
};

export const createFileData = async (conn = db, file) => {
  const result = await conn.file.create({
    data: file,
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


export const updateFileData = async (id, file, conn = db) => {
  const result = await conn.file.update({
    where: { id },
    data: {
      ...file,
      modifiedAt: new Date(),
    },
    include: {
      track: {
        include: {
          _count: {
            select: {
              files: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  return result;
};

export const deleteFileData = async (id, conn = db) => {
  const result = await conn.file.delete({
    where: {
      id: id,
    },
  });
  return result;
};
