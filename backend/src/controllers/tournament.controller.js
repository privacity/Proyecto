const TorneoModel = require("../models/TorneoModel");
const knex = require('../../../database/knex');

const TournamentController = {

    async create(req, res) {
        try {
            const { nombreTorneo, categoria, sede, fechaInicio, fechaFin, idOrganizador } = req.body;

            if (!nombreTorneo || !categoria || !idOrganizador) {
                return res.status(400).json({ error: "Campos incompletos." });
            }

            const existe = await TorneoModel.findByName(nombreTorneo);
            if (existe) {
                return res.status(400).json({ error: "El nombre del torneo ya existe." });
            }

            if (!req.file) {
                return res.status(400).json({ error: "Debes subir una convocatoria." });
            }

            await TorneoModel.create({
                nombreTorneo,
                categoria,
                sede,
                fechaInicio,
                fechaFin,
                idOrganizador,
                convocatoriaArchivo: req.file.filename
            });

            res.status(201).json({ mensaje: "Torneo creado correctamente." });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getCurrentTournaments(req, res) {
        try {
            const torneos = await knex('Torneo').select('*');
            res.json(torneos);
        } catch (err) {
            res.status(500).json({ error: "Error al obtener torneos" });
        }
    },

    async listTournaments(req, res) {
        try {
            const torneos = await knex('Torneo').select('*');
            res.json(torneos);
        } catch (err) {
            res.status(500).json({ error: "Error al obtener torneos" });
        }
    }
};

module.exports = TournamentController;
