import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
const { db } = require("@/lib/db");

export const generateVerifToken = async (email) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existsToken = await getVerificationTokenByEmail(email);
  if (existsToken) {
    await db.verificationToken.delete({
      where: {
        id: existsToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existsToken = await getPasswordResetTokenByEmail(email);

  if (existsToken) {
    await db.passwordResetToken.delete({
      where: { id: existsToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};
