import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    createUser: async (_, { name, email, avatar, googleId }) => {
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
