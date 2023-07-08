import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  if (req.method === 'GET') {
    const {
      session: { user },
    } = req;
    if (!user)
      return res
        .status(401)
        .json({ ok: false, message: '로그인하세요.' });
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
    if (currentUser.email !== email) {
      const checkEmail = await client.user.findUnique({
        where: {
          email,
        },
      });
      if (checkEmail) {
        return res.status(409).json({
          ok: false,
          message: '다른 이메일을 입력해 주세요.',
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
    }
    if (currentUser.name !== name) {
      const checkUsername = await client.user.findUnique({
        where: {
          name,
        },
      });
      if (checkUsername) {
        return res.status(409).json({
          ok: false,
          message: '다른 이름을 입력해 주세요.',
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
    }
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    method: ['GET', 'POST'],
    handler,
  })
);
