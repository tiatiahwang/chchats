import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    session: { user },
    query: { page },
  } = req;
  const limit = 10;
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
    skip: (page - 1) * limit,
    take: limit,
  });
  const count = await client.comment.count({
    where: {
      userId: user.id,
    },
  });
  res.json({
    ok: true,
    comments,
    totalPages:
      Math.ceil(count / limit) === 0
        ? 1
        : Math.ceil(count / limit),
  });
}

export default withApiSession(
  withHandler({
    method: 'GET',
    handler,
  }),
);
