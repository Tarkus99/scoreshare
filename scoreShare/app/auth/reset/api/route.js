export const dynamic = "force-dynamic";
import { getUserByEmail } from "@/data/user";
import { resolveError } from "@/lib/error-resolver";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";

export async function POST(request) {
  const data = await request.json();
  try {
    const { email } = await ResetSchema.validate(data);
    const existsUser = await getUserByEmail(email);
    if (!existsUser)
      return Response.json({ message: "Email not found!" }, { status: 401 });

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

    return Response.json({ message: "Reset email sent!" }, { status: 200 });
  } catch (error) {
    resolveError(error)
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
