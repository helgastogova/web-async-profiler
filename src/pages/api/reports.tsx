import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage: storage }).single('file');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const user = req.headers['authorization'] as string;

    if (!user) {
      console.error('Unauthorized');
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      const filePath = req.file.path;

      const report = await prisma.report.create({
        data: {
          title: req.body.title ?? `untitled-${new Date().toLocaleString()}`,
          filePath: filePath,
          authorId: user.id,
        },
      });

      res.status(201).json(report);
    });
  } else {
    res.status(405).end();
  }
}
