import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  if (req.method === 'GET') {
    const {
      query: { category },
    } = req;
    const posts = await client.post.findMany({
      where: {
        category,
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
    res.json({
      ok: true,
      posts,
    });
  }
  if (req.method === 'POST') {
    const {
      body: { title, contents, category },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        title,
        contents,
        category,
        image: '',
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler }),
);
