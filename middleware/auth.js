const JWT = require('jsonwebtoken');

const authMiddleWare = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    throw Error('no token provided');
  }

  const token = auth.split(' ')[1];
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const { userId, name } = decoded;
    req.user = {
      id: userId,
      name,
    };
    next();
  } catch (e) {
    throw Error('not authorized to access this route');
  }
};

module.exports = authMiddleWare;
