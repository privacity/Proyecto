const tournamentService = require("../services/tournament.service");

exports.createTournament = async (req, res) => {
    try {
        const { name, category } = req.body;
        const file = req.file;

        const tournament = await tournamentService.createTournament({
            name,
            category,
            file
        });

        return res.status(201).json({
            mensaje: "Torneo creado correctamente",
            torneo: tournament
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
