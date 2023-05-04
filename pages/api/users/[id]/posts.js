import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    session: { user },
  } = req;
  const posts = await client.post.findMany({
    where: {
      userId: user.id,
    },
  });
  console.log(posts);
  res.json({
    ok: true,
    posts,
  });
}

export default withApiSession(
  withHandler({
    method: 'GET',
    handler,
  }),
);
