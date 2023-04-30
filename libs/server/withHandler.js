const METHOD = 'GET' || 'POST' || 'DELETE';

export default function withHandler({ method, handler, isPrivate = true }) {
  return async function (req, res) {
    if (
      req.method !== 'GET' &&
      req.method !== 'POST' &&
      req.method !== 'DELETE'
    ) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res
        .status(401)
        .json({ ok: false, message: '로그인이 필요합니다.' });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
