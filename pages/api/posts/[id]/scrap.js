import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    query: { id },
    session: { user },
  } = req;
  const title = req.body;

  const scrap = await client.scrap.create({
    data: {
      title,
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id,
        },
      },
    },
  });
  res.json({
    ok: true,
    scrap,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  }),
);
