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
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        const user = await prisma.user.findFirst({
          where: {
            email
          },
        });
        console.log("first", user);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    // }),
    // Github({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {

  //   async signIn({ user }) {
  //     if (!user.email) return false;
  //     try {
  //       await prisma.user.upsert({
  //         where: { email: user.email },
  //         update: {},
  //         create: { email: user.email },
  //       });
  //     } catch (e) {
  //       console.error("SignIn Error:", e);
  //       return false;
  //     }
  //     return true;
  //   },
  // },

  callbacks: {
    async jwt({ token, user }) {
      // On first login
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      // Attach `id` to the session on the client
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
