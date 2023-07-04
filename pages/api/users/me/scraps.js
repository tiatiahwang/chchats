import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    session: { user },
    query: { page },
  } = req;
  const limit = 10;
  const scraps = await client.scrap.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      userId: user.id,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          category: true,
          subCategory: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              comments: true,
              likes: true,
            },
          },
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  const count = await client.scrap.count({
    where: {
      userId: user.id,
    },
  });
  res.json({
    ok: true,
    scraps,
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
