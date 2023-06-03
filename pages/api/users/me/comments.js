import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    session: { user },
  } = req;
  const comments = await client.comment.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      userId: user.id,
    },
    include: {
      user: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
      post: {
        select: {
          title: true,
          category: true,
          subCategory: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    comments,
  });
}

export default withApiSession(
  withHandler({
    method: 'GET',
    handler,
  }),
);
