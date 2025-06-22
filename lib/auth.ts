// import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import prisma from "@/lib/db";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "email",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Github({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      // On first login
      if (user) {
        token.id = user.id;
        token.image = user.image || null;
      }
      return token;
    },

    async session({ session, token }) {
      // Attach `id` to the session on the client
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.image as string | null;
      }
      return session;
    },
  },
};
