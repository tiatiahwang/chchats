import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  //   if (req.method === 'GET') {
  //     const products = await client.product.findMany({});
  //     res.json({
  //       ok: true,
  //       products,
  //     });
  //   }
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