import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type CreateUserArgs = {
  name: string;
  email: string;
  avatar: string;
  googleId: string;
};

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: async (_: unknown, { name, email, avatar, googleId }: CreateUserArgs) => {
      return await prisma.user.create({
        data: {
          name,
          email,
          avatar,
          googleId,
        },
      });
    },
  },
};
