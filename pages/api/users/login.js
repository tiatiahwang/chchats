const bcrypt = require('bcryptjs');

import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const { email, password } = req.body;

  const found = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!found) {
    return res.status(404).json({
      ok: false,
      message: '가입되지 않은 이메일 입니다.',
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    found.password,
  );

  if (!isMatch) {
    return res.status(404).json({
      ok: false,
      message: '잘못된 비밀번호 입니다.',
    });
  }

  req.session.user = {
    id: found.id,
  };
  await req.session.save();

  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    method: 'POST',
    handler,
  }),
);
