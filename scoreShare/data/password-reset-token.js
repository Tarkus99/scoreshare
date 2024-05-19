import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token) => {
  try {
    const passwordToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email) => {
  try {
    const passwordToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordToken;
  } catch (error) {
    return null;
  }
};
