import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const { body: commentId } = req;
  await client.comment.delete({
    where: {
      id: +commentId,
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
