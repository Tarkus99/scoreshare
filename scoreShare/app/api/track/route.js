"use server";

import { getTrackByQuery } from "@/data/track";
import { DateTime } from "luxon";
import { supGetPublicUrl, supUploadImage } from "@/lib/supabase";
import { db } from "@/lib/db";
import { uploadFileAlongWithTrack } from "@/actions/fileActions";
import { resolveError } from "@/lib/error-resolver";

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const result = await getTrackByQuery(query);

  return Response.json(result);
}

export async function POST(request) {
  console.log("HOLAAAAAAAAAAAA");
  const body = await request.formData();
  let finalImage = body.get("image");

  try {
    if (typeof finalImage !== "string") {
      const uploadImageInfo = await supUploadImage(finalImage);
      if (uploadImageInfo.error) {
        let err = new Error(uploadImageInfo.error.message);
        err.code = uploadImageInfo.error.statusCode;
        throw err;
      }

      const publicUrl = await supGetPublicUrl("images", uploadImageInfo.data.path);

      finalImage = publicUrl;
    }

    const finalTrack = {
      id: body.get("id") || undefined,
      name: body.get("name"),
      source: body.get("source"),
      date: DateTime.fromISO(body.get("date")).toISO(),
      key: body.get("key"),
      tempo: parseInt(body.get("tempo")),
      image: finalImage,
    };

    const finalArtists = JSON.parse(body.get("artist"));

    await db.$transaction(async (tx) => {
      const track = await tx.track.create({
        data: {
          ...finalTrack,
          artists: {
            connectOrCreate: finalArtists.map((artist) => {
              return {
                where: { id: artist.id },
                create: artist,
              };
            }),
          },
        },
      });

      const fileData = new FormData();
      fileData.append("name", body.get("fileName"));
      fileData.append("instrument", body.get("instrument"));
      fileData.append("file", body.get("file"));

      await uploadFileAlongWithTrack(fileData, track.id, tx);
    });

    return Response.json(
      { message: "Track created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    //DELETE IMAGES ALREADY UPLOADED
    console.log(error);
    const [status, message] = resolveError(error);
    console.log(status, message);

    return Response.json({ message: message }, { status: status });
  }
}
