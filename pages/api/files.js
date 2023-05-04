import withHandler from '@/libs/server/withHandler';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req, res) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1/direct_upload`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
    },
  );
  const result = await response.json();
  res.json({
    ok: true,
    ...result.result,
  });
}

export default withApiSession(
  withHandler({ methods: ['GET'], handler }),
);
