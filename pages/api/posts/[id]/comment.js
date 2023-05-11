import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    query: { id },
    body: { contents },
    session: { user },
  } = req;
  const comment = await client.comment.create({
    data: {
      contents,
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
    comment,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  }),
);
