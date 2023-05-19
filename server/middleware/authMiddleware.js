const authMiddleware = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // User is authenticated, proceed to the next middleware or route handler
    next();
};

module.exports = authMiddleware;
