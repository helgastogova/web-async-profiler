import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import next from 'next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors'; // Установите пакет, если ещё не

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  server.use(cors());

  try {
    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: server, path: '/api/graphql' });
  } catch (error) {
    console.error('Apollo Server Init Error: ', error);
  }

  server.use(express.json({ limit: '15mb' }));
  server.use(express.urlencoded({ limit: '15mb', extended: true }));

  server.options('*', (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.end();
  });

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT ?? 3000;

  server.listen(PORT, (err?: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
