export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { supGetPublicUrl, supUploadAvatar } from "@/lib/supabase";
import { resolveError } from "@/lib/error-resolver";
import { currentUser } from "@/actions/server";

export async function PUT(request) {
  const user = await currentUser();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const body = await request.formData();
  const userInfo = {};
  for (const pair of body.entries()) {
    if (pair[1] === "undefined") userInfo[pair[0]] = undefined;
    else userInfo[pair[0]] = pair[1];
  }

  if (user.id !== id)
    return Response.json({ message: "Unauthorized!" }, { status: 403 });

  try {
    if (userInfo.image) {
      const avatarUploadInfo = await supUploadAvatar(userInfo.image);

      if (avatarUploadInfo.error) throw new Error(error.message);
      const publicUrl = await supGetPublicUrl(
        "avatars",
        avatarUploadInfo.data.path
      );
      userInfo.image = publicUrl;
    }

    await db.user.update({
      where: { id },
      data: { ...userInfo },
    });

    return Response.json(
      { message: "Info updated succesfully!" },
      { status: 200 }
    );
  } catch (error) {
    const [status, message] = resolveError(error);
    return Response.json({ message: message }, { status: status });
  }
}
