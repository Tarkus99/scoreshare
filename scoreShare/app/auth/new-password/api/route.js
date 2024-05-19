import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function PUT(request) {
  const { newPassword, token } = await request.json();
  console.log(newPassword.password, token);
  try {
    await NewPasswordSchema.validate(newPassword);

    if (!token)
      return Response.json({ message: "Missing token!" }, { status: 401 });

    const existsToken = await getPasswordResetTokenByToken(token);

    if (!existsToken)
      return Response.json({ message: "Invalid token!" }, { status: 404 });

    const isExpired = new Date(existsToken.expires) < new Date();
    if (isExpired)
      return Response.json({ message: "Token has expired!" }, { status: 401 });

    const existsUser = await getUserByEmail(existsToken.email);

    if (!existsUser)
      return Response.json(
        { message: "Email doesnt exists!" },
        { status: 401 }
      );

    const hashedPassword = await bcrypt.hash(newPassword.password, 10);

    await db.user.update({
      where: {
        id: existsUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResetToken.delete({
      where: { id: existsToken.id },
    });
    return Response.json(
      { message: "Password has been updated!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
