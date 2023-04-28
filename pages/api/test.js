import client from '@/libs/client';

export default async function handler(req, res) {
  await client.user.create({
    data: {
      email: 'hi',
      name: 'hi',
      password: '123',
    },
  });
  res.json({
    ok: true,
  });
}
