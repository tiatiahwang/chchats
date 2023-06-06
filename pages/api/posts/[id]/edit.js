import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    body: { title, contents, category, subCategory },
    query: { id },
  } = req;

  await client.post.update({
    where: {
      id: +id,
    },
    data: {
      title,
      contents,
      category,
      subCategory,
    },
  });
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
