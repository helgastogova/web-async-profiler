import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async jwt({ token, account }: NextAuth.JWT) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: NextAuth.Session) {
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ user }: NextAuth.SignInEvent) {
      if (!user.email) return false;
      let existingUser;
      try {
        existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
      } catch (error) {
        console.error('Prisma error:', error);
      }

      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            avatar: user.image,
            googleId: user.id,
          },
        });
      }

      return true;
    },
  },
});
