import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  callbacks: {
    // Called when user signs in

    
    async signIn({ user, account }) {

      if (user.email === process.env.ADMIN_EMAIL) {

          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
      });
    
    // If user exists and is already admin, allow sign in
        if (existingUser?.isAdmin) {
          return true;
        }
    
   
        if (existingUser) {
          await prisma.user.update({
            where: { email: user.email },
            data: { isAdmin: true },
          });
        return true;
    }
    
    // New user with admin email - will be created by adapter
    return true;
    }
  
  
  return false;
    },
    // Called when creating JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as any).isAdmin || false;
      }
      return token;
    },
    
    // Called when creating session
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  
  pages: {
    signIn: '/auth/signin',
  },
  
  session: {
    strategy: "jwt",
  },
};