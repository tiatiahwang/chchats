import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyLiked = await client.like.findFirst({
    where: {
      postId: +id,
      userId: user?.id,
    },
  });
  if (alreadyLiked) {
    await client.like.delete({
      where: {
        id: alreadyLiked.id,
      },
    });
  } else {
    await client.like.create({
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
  })
);
