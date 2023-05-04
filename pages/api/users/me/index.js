import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  if (req.method === 'GET') {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
    });
    res.json({
      ok: true,
      profile,
    });
  }
  if (req.method === 'POST') {
    const {
      body: { email, name, avatarId },
      session: { user },
    } = req;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (avatarId) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          avatar: avatarId,
        },
      });
    }
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ method: ['GET', 'POST'], handler }),
);
