import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '@server/graphql/schema';
import { resolvers } from '@server/graphql/resolvers';

import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMocks = addMocksToSchema({ schema });

const apolloServer = new ApolloServer({ schema: schemaWithMocks });

let isApolloServerStarted = false;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  if (!isApolloServerStarted) {
    await apolloServer.start();
    isApolloServerStarted = true;
  }

  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
