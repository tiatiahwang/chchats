import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    session: { user },
    query: { page },
  } = req;
  const limit = 10;
  const posts = await client.post.findMany({
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
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  const count = await client.post.count({
    where: {
      userId: user.id,
    },
  });
  res.json({
    ok: true,
    posts,
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
