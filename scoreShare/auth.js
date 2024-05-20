import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {

      if (account.provider !== "credentials") return true;

      const existsUser = await getUserById(user.id);

      if (!existsUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub /*  && session.user */) {
        session.user.id = token.sub;
      }
      if (token.role /*  && session.user */) {
        session.user.role = token.role;
      }
      session.user.isOAuth = token.isOAuth;
      session.user.image = token.image;
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existsUser = await getUserById(token.sub);
      if (!existsUser) return token;
      
      const existsAccount = await getAccountByUserId(existsUser.id);

      token.isOAuth = !!existsAccount;

      token.name = existsUser.name;
      token.email = existsUser.email;
      token.image = existsUser.image;
      token.role = existsUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
