const torneoService = require("../services/torneo.service");

exports.crearTorneo = async (req, res) => {
    try {
        const { nombre, categoria } = req.body;
        const archivo = req.file;

        const torneo = await torneoService.crearTorneo({
            nombre,
            categoria,
            archivo
        });

        return res.status(201).json({
            mensaje: "Torneo creado correctamente",
            torneo
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
