const Tournament = require("../models/tournament.model");

exports.createTournament = async ({ name, category, file }) => {
    if (!name) {
        throw new Error("El nombre del torneo es obligatorio");
    }

    const existing = await Tournament.findByName(name);
    if (existing) {
        throw new Error("Ya existe un torneo con ese nombre");
    }

    // Map English input -> Spanish DB columns (no DB rename needed)
    const data = {
        nombre: name,
        categoria: category || null,
        archivo: file ? file.originalname : null
    };

    const inserted = await Tournament.create(data);
    // Knex returning('*') may return an array
    return Array.isArray(inserted) ? inserted[0] : inserted;
};