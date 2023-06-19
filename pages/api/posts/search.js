import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    query: { keyword },
  } = req;
  if (!keyword) {
    return res.json({ ok: false });
  }
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
    },
  });
  res.json({ ok: true, posts });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);
