import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    query: { keyword, page },
  } = req;
  if (!keyword) {
    return res.json({ ok: false });
  }
  const limit = 10;
  const decoded = decodeURI(keyword);
  const posts = await client.post.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      title: {
        contains: decoded,
      },
    },
    include: {
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
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  const count = await client.post.count({
    where: {
      title: {
        contains: decoded,
      },
    },
  });
  res.json({
    ok: true,
    posts,
    totalPages: Math.ceil(count / limit),
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);
