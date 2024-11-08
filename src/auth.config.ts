import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Github],
} satisfies NextAuthConfig;
