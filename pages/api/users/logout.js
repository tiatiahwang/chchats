import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const {
    session: { user },
  } = req;
  if (!user) {
    return res
      .status(403)
      .json({ ok: false, message: '잘못된 요청입니다.' });
  }

  await req.session.destroy();
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    method: 'POST',
    handler,
  }),
);
