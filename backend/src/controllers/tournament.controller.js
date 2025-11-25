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
    },

    async getTournamentById(req, res) {
        try {
            const { id } = req.params;
            const torneo = await knex('Torneo').where('idTorneo', id).first();

            if (!torneo) {
                return res.status(404).json({ error: 'Torneo no encontrado' });
            }

            res.json(torneo);
        } catch (err) {
            console.error('Error al obtener el torneo:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    async updateTournament(req, res) {
        try {
            const { id } = req.params;
            const { estadoTorneo, fechaInicio, fechaFin } = req.body;

            const updated = await knex('Torneo')
                .where('idTorneo', id)
                .update({ estadoTorneo, fechaInicio, fechaFin });

            if (!updated) {
                return res.status(404).json({ error: 'Torneo no encontrado' });
            }

            res.json({ message: 'Torneo actualizado correctamente' });
        } catch (err) {
            console.error('Error al actualizar el torneo:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    async getActiveConvocatorias(req, res) {
        try {
            const convocatorias = await knex('Torneo')
                .select('idTorneo', 'nombreTorneo', 'categoria', 'sede', 'fechaInicio', 'fechaFin', 'convocatoriaArchivo')
                .whereIn('estadoTorneo', ['Planificacion', 'EnCurso']);

            if (convocatorias.length === 0) {
                return res.status(404).json({ error: 'No hay convocatorias activas.' });
            }

            res.json(convocatorias);
        } catch (err) {
            console.error('Error al obtener convocatorias activas:', err);
            res.status(500).json({ error: 'Error interno del servidor.' });
        }
    },

    async inscribirEquipo(req, res) {
        try {
            const { id } = req.params; // ID de la convocatoria
            const { idEquipo } = req.body; // ID del equipo que se inscribe

            // Validar que la convocatoria exista y esté activa
            const convocatoria = await knex('Torneo')
                .where('idTorneo', id)
                .whereIn('estadoTorneo', ['Planificacion', 'EnCurso'])
                .first();

            if (!convocatoria) {
                return res.status(404).json({ error: 'Convocatoria no encontrada o no activa.' });
            }

            // Validar que el equipo exista
            const equipo = await knex('Equipo').where('idEquipo', idEquipo).first();

            if (!equipo) {
                return res.status(404).json({ error: 'Equipo no encontrado.' });
            }

            // Registrar la inscripción (puedes crear una tabla específica para inscripciones si es necesario)
            await knex('Participacion').insert({
                idEquipo,
                idTorneo: id,
                fechaRegistro: new Date()
            });

            res.status(201).json({ message: 'Equipo inscrito correctamente en la convocatoria.' });
        } catch (err) {
            console.error('Error al inscribir equipo:', err);
            res.status(500).json({ error: 'Error interno del servidor.' });
        }
    }
};

module.exports = TournamentController;
