import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  if (req.method === 'GET') {
    const {
      query: { category, subCategory, isHome, page },
    } = req;
    let posts;
    let count;
    const limit = 3;
    // subCategory가 '전체'인 경우
    if (subCategory === undefined) {
      if (isHome === 'true') {
        posts = await client.post.findMany({
          orderBy: { createdAt: 'desc' },
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
          take: 5,
        });
      } else {
        posts = await client.post.findMany({
          orderBy: { createdAt: 'desc' },
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
          skip: (page - 1) * limit,
          take: limit,
        });
        count = await client.post.count({
          where: {
            category,
          },
        });
      }
    } else {
      posts = await client.post.findMany({
        orderBy: { createdAt: 'desc' },
        where: {
          category,
          subCategory,
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
    }
    res.json({
      ok: true,
      posts,
      totalPages: Math.ceil(count / limit),
    });
  }
  if (req.method === 'POST') {
    const {
      body: { title, contents, category, subCategory },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        title,
        contents,
        category,
        subCategory,
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
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  }),
);
