const db = require("../config/db");

exports.buscarPorNombre = (nombre) => {
    return db("torneos").where({ nombre }).first();
};

exports.crear = (data) => {
    return db("torneos").insert(data).returning("*");
};
