export const dynamic = "force-dynamic";
import { getUserByEmail, insertUser } from "@/data/user";
import { db } from "@/lib/db";
import { resolveError } from "@/lib/error-resolver";
import { sendVerfiEmail } from "@/lib/mail";
import { generateVerifToken } from "@/lib/token";
import { hasForbiddenContent } from "@/lib/utils";
import { LoginSchema } from "@/schemas";
import bcryptjs from "bcryptjs";

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

    const hashedPassword = await bcryptjs.hash(password, 10);
    await db.$transaction(async (tx) => {
      await insertUser(
        {
          name,
          email,
          password: hashedPassword,
        },
        tx
      );

      const verificationToken = await generateVerifToken(email);
      await sendVerfiEmail(verificationToken.email, verificationToken.token);
    });

    //send verification token email
    return Response.json(
      {
        message: "Confirmation email sent! Check your spam folder",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    const [status, message] = resolveError(error);
    return Response.json(
      {
        message: message,
      },
      {
        status: status,
      }
    );
  }
}
