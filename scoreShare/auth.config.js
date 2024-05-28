import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Spotify from "next-auth/providers/spotify"

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import { resolveError } from "./lib/error-resolver";

export default {
  providers: [
    Spotify({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const { email, password } = await LoginSchema.validate(credentials);

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;

        } catch (err) {
          resolveError(err)
        }
        return null;
      },
    }),
  ],
};