const METHOD = 'GET' || 'POST' || 'DELETE';

export default function withHandler(method, fn) {
  return async function (req, res) {
    if (
      req.method !== 'GET' &&
      req.method !== 'POST' &&
      req.method !== 'DELETE'
    ) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
