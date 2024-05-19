import { db } from "@/lib/db";

export const getTrackByQuery = async (query) => {
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

export const getTrackById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
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
