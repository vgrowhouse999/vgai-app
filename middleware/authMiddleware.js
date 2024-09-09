// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"
  if (!token) return res.status(401).send('Access Denied. No token provided.');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Invalid Token.');
    
    req.user = decoded; // Attach the decoded token payload (e.g., username) to the request
    next(); // Pass control to the next middleware or route
  });
};

module.exports = authenticate;
