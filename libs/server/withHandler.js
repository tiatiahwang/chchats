export default function withHandler({ methods, handler }) {
  return async function (req, res) {
    if (req.methods && !methods.includes(req.methods)) {
      return res.status(405).end();
    }
    // if (!req.session.user) {
    //   return res.status(401).json({
    //     ok: false,
    //     message: '로그인이 필요합니다.',
    //   });
    // }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
