const db = require("../config/db");

exports.findByName = (name) => {
    return db("torneos").where({ nombre: name }).first();
};

exports.create = (data) => {
    return db("torneos").insert(data).returning("*");
};
