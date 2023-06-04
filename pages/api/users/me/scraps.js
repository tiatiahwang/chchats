import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    session: { user },
  } = req;
  const scraps = await client.scrap.findMany({
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
          id: true,
          title: true,
          category: true,
          subCategory: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    scraps,
  });
}

export default withApiSession(
  withHandler({
    method: 'GET',
    handler,
  }),
);
