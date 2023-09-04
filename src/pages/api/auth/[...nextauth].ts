import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export default NextAuth({
  secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  // callbacks: {
  //   async signIn({ user }) {
  //     if (!user.email) {
  //       return false;
  //     }

  //     const existingUser = await prisma.user.findUnique({
  //       where: { email: user.email },
  //     });

  //     if (!existingUser) {
  //       await prisma.user.create({
  //         data: {
  //           name: user.name,
  //           email: user.email,
  //           avatar: user.image,
  //           googleId: user.id,
  //         },
  //       });
  //     }

  //     return true;
  //   },
  // },
});
