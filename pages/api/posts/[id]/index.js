import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    query: { id },
    session: { user },
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
  const isMyPost = user
    ? Boolean(user?.id === post.user.id)
    : false;
  const isScrapped = user
    ? Boolean(
        await client.scrap.findFirst({
          where: {
            postId: +id,
            userId: user?.id,
          },
          select: {
            id: true,
          },
        }),
      )
    : false;
  res.json({
    ok: true,
    post,
    isMyPost,
    isScrapped,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  }),
);
