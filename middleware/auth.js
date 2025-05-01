const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_very_strong_and_secret_jwt_key_please_change_me';

module.exports = function(req, res, next) {
  const authHeader = req.header('authorization');
  
  if (!authHeader) {
    return res.status(401).send({ msg: 'No token, authorization denied' });
  }

  try {
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : authHeader;
      
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send({ msg: 'Token is not valid' });
  }
};
