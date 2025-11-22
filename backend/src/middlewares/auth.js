module.exports = (req, _res, next) => {
    // Placeholder auth; replace with real logic (JWT, sessions, etc.)
    req.user = { id: 'anonymous' };
    next();
};
