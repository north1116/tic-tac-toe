// auth.config.ts
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  })],
  pages: {
    signIn: "/signIn",
  },
}