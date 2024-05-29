import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;

export const sendVerfiEmail = async (email, token) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const a = await resend.emails.send({
    from: "mail@scoreshare.org",
    to: email,
    subject: "Confirm your email.",
    html: `<p>Click <a href="${confirmLink}">to confirm email.</a></p>`,
  });
  
  if (a.error && a.data === null) {
    let error = new Error(a.error.message);
    error.code = a.error.statusCode;
    throw error;
  }
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const a = await resend.emails.send({
    from: "mail@scoreshare.org",
    to: email,
    subject: "Reset your password.",
    html: `<p>Click <a href="${resetLink}">to reset password.</a></p>`,
  });

  if (a.error && a.data === null) {
    let error = new Error(a.error.message);
    error.code = a.error.statusCode;
    throw error;
  }
};
