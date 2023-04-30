const bcrypt = require('bcryptjs');

import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';

async function handler(req, res) {
  const { email, password } = req.body;

  const checkEmail = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (checkEmail) {
    return res
      .status(409)
      .json({ ok: false, message: '이미 가입된 이메일 입니다.' });
  }

  const salt = await bcrypt.genSalt(10); // generate a salt with 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt);

  await client.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'anonymous',
    },
  });

  res.json({
    ok: true,
  });
}

export default withHandler({
  method: 'POST',
  handler,
  isPrivate: false,
});
