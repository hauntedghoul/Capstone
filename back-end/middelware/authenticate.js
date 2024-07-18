const jwt = require('jsonwebtoken');

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded; // Attach the user info to the request
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

module.exports = authenticateUser;
