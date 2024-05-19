export const dynamic = "force-dynamic";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export async function PUT(request) {
  const token = await request.json();
  try {
    const existsToken = await getVerificationTokenByToken(token);

    if (!existsToken)
      return Response.json(
        { message: "Token doesnt exists!" },
        { status: 401 }
      );

    const isExpired = new Date(existsToken.expires) < new Date();
    if (isExpired)
      return Response.json({ message: "Token has expired!" }, { status: 401 });

    const existsUser = await getUserByEmail(existsToken.email);

    if (!existsUser)
      return Response.json(
        { message: "Email doesnt exists!" },
        { status: 401 }
      );

    await db.user.update({
      where: { id: existsUser.id },
      data: {
        emailVerified: new Date(),
        email: existsToken.email,
      },
    });
    
    await db.verificationToken.delete({
      where: { id: existsToken.id },
    });

    return Response.json(
      { message: "Email verified with success!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
