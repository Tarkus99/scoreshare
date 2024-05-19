"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerifToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";
import { sendVerfiEmail } from "@/lib/mail";

export const login = async (values) => {
  try {
    const { email, password } = await LoginSchema.validate(values);

    const user = await getUserByEmail(email);

    if (!user || !user.password) return { error: "Email does not exist!" };

    if (!user.emailVerified) {
      const verificationToken = await generateVerifToken(user.email);

      await sendVerfiEmail(verificationToken.email, verificationToken.token);

      return { success: "Confirmation email sent!" };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
