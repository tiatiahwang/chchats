const bcrypt = require('bcryptjs');

import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';

async function handler(req, res) {
  const { email, username, password } = req.body;
  console.log(email, username, password);

  const checkEmail = await client.user.findUnique({
    where: {
      email,
    },
  });

  const checkUsername = await client.user.findUnique({
    where: {
      name: username,
    },
  });

  if (checkEmail && checkUsername) {
    return res.status(409).json({
      ok: false,
      message: '다른 이메일과 이름을 입력해 주세요.',
    });
  } else if (checkEmail && !checkUsername) {
    return res.status(409).json({
      ok: false,
      message: '다른 이메일을 입력해 주세요.',
    });
  } else if (!checkEmail && checkUsername) {
    return res.status(409).json({
      ok: false,
      message: '다른 이름을 입력해 주세요.',
    });
  }

  const salt = await bcrypt.genSalt(10); // generate a salt with 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt);

  await client.user.create({
    data: {
      email,
      password: hashedPassword,
      name: username,
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
