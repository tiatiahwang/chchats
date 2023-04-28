import withHandler from '@/libs/server/withHandler';

async function handler(req, res) {
  console.log(req.body);
}

export default withHandler('POST', handler);
