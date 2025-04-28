const jwt = require('jsonwebtoken');

// Use JWT_SECRET from environment variables (Render.com) or fallback to a default value
const JWT_SECRET = process.env.JWT_SECRET || 'your_very_strong_and_secret_jwt_key_please_change_me';

module.exports = function(req, res, next) {
  const authHeader = req.header('authorization');
  
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Extract the token (remove 'Bearer ' if present)
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : authHeader;
      
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
