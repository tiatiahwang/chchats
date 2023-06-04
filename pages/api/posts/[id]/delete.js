import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    query: { id },
  } = req;
  await client.post.delete({
    where: {
      id: +id,
    },
  });
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ['DELETE'],
    handler,
  }),
);
