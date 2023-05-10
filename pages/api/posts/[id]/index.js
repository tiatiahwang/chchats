import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    query: { id },
  } = req;

  const post = await client.post.findUnique({
    where: { id: +id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      comments: {
        select: {
          id: true,
          contents: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    post,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);
