const db = require("../../../database/knex");

class TorneoModel {
    static async findByName(nombre) {
        return db("Torneo")
            .where("nombreTorneo", nombre)
            .first();
    }

    static async create(data) {
        return db("Torneo").insert(data);
    }

    static async findAll() {
        return db("Torneo").select("*");
    }
}

module.exports = TorneoModel;
