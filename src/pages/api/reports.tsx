import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const token = req.headers['authorization'] as string;

    const user = await findUserByToken(token);

    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const report = await prisma.report.create({
      data: {
        title: req.body.title ?? `untitled-${new Date().toLocaleString()}`,
        filePath: req.body.filePath,
        authorId: user.id,
      },
    });

    res.status(201).json(report);
  } else {
    res.status(405).end();
  }
}

async function findUserByToken(token: string) {
  return await prisma.user.findUnique({ where: { token } });
}
