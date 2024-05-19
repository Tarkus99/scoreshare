export const dynamic = "force-dynamic";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { supGetPublicUrl, supUploadAvatar } from "@/lib/supabase";
import { sendVerfiEmail } from "@/lib/mail";
import { generateVerifToken } from "@/lib/token";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { hasForbiddenContent } from "@/lib/utils";

export async function POST(request) {
  const data = await request.json();
  try {
    const { email, name, password } = await LoginSchema.validate(data);

    if (hasForbiddenContent(name))
      throw new Error("It is not allowed to insert inapropiate content!");

    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return Response.json(
        {
          message: "Email already taken!",
        },
        {
          status: 400,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerifToken(email);
    await sendVerfiEmail(verificationToken.email, verificationToken.token);

    //send verification token email
    return Response.json(
      {
        message: "Confirmation email sent!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const body = await request.formData();
  const userInfo = {};
  for (const pair of body.entries()) {
    if (pair[1] === "undefined") userInfo[pair[0]] = undefined;
    else userInfo[pair[0]] = pair[1];
  }

  try {
    const existsUser = await getUserByEmail(userInfo.email);

    if (!existsUser)
      return Response.json(
        { message: "Email doesnt exists!" },
        { status: 401 }
      );

    if (userInfo.image) {
      const avatarUploadInfo = await supUploadAvatar(userInfo.image);

      if (avatarUploadInfo.error) throw new Error(error.message);
      const publicUrl = await supGetPublicUrl(
        "avatars",
        avatarUploadInfo.data.path
      );
      console.log(publicUrl);
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
    console.log(error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
