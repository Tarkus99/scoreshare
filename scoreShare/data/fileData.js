import { db } from "@/lib/db";

export const getFileById = async (id) => {
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
    },
  });
  return files;
};

export const getFilesByUserId = async (id) => {
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
    },
  });
  return files;
};

export const createFile = async (conn = db, file) => {
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


export const updateFile = async (id, file, conn = db) => {
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

export const deleteFile = async (id, conn = db) => {
  const result = await conn.file.delete({
    where: {
      id: id,
    },
  });
  return result;
};
