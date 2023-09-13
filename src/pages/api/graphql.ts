import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '@server/graphql/schema';
import { resolvers } from '@server/graphql/resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { NextApiRequest, NextApiResponse } from 'next';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema,
});

let isApolloServerStarted = false;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  try {
    if (!isApolloServerStarted) {
      await apolloServer.start();
      isApolloServerStarted = true;
    }
  } catch (error) {
    console.error("Apollo Server couldn't be started:", error);
    res.status(500).end();
    return;
  }

  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
