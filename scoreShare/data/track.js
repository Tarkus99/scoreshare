import { db } from "@/lib/db";

export const getTrackByQueryData = async (query) => {
  const tracks = await db.track.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { source: { contains: query, mode: "insensitive" } },
        {
          artists: {
            some: {
              name: { contains: query, mode: "insensitive" },
            },
          },
        },
      ],
    },
    include: {
      artists: true,
    },
    take: 10,
  });
  return tracks;
};

export const getTrackByIdData = async (id) => {
  const track = await db.track.findUnique({
    where: {
      id: id,
    },
    include: {
      artists: true,
    },
  });

  return track;
};

export const getPopularTracksData = async () => {
  const result = db.track.findMany({
    take: 10,
    orderBy: {
      files: {
        _count: "desc",
      },
    },
    include: {
      artists: true,
    },
  });
  return result;
};

export const getRecentTracksData = async () => {
  const result = db.track.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc"
    },
    include: {
      artists: true,
    },
  });
  return result;
};
