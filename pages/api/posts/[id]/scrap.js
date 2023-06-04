import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyScrapped = await client.scrap.findFirst({
    where: {
      postId: +id,
      userId: user?.id,
    },
  });
  if (alreadyScrapped) {
    await client.scrap.delete({
      where: {
        id: alreadyScrapped.id,
      },
    });
  } else {
    await client.scrap.create({
      data: {
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
  }
  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  }),
);
