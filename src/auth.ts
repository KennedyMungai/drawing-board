import authConfig from "@/auth.config";
import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  callbacks: {
    session({ session, token }) {
      if (token.id) session.user.id = token.id;

      return session;
    },
    jwt({ token, user }) {
      if (user) token.id = user.id;

      return token;
    },
  },
  ...authConfig,
});
