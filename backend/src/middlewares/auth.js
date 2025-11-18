module.exports = (req, res, next) => {
    const autorizado = true; // luego lo conectas con JWT
    if (!autorizado) return res.status(401).json({ error: "No autorizado" });
    next();
};
