import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerfiEmail = async (email, token) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const a = await resend.emails.send({
    from: "mail@scoreshare.org.com",
    to: email,
    subject: "Confirm your email.",
    html: `<p>Click <a href="${confirmLink}">to confirm email.</a></p>`,
  });
  console.log(a);
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const a = await resend.emails.send({
    from: "mail@scoreshare.org.com",
    to: email,
    subject: "Reset your password.",
    html: `<p>Click <a href="${resetLink}">to reset password.</a></p>`,
  });
  console.log(a);
};
