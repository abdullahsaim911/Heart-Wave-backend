const jwt = require('jsonwebtoken');

const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden: Access is denied' });
      }
      next();  // Proceed to the next middleware or route handler
    };
  };
  
  module.exports = { roleMiddleware };