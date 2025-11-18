const tournamentModel = require("../models/tournament.model");

exports.crearTorneo = async ({ nombre, categoria, archivo }) => {

    // 1. Validar nombre único
    const existe = await tournamentModel.buscarPorNombre(nombre);
    if (existe) throw new Error("El nombre del torneo ya existe");

    // 2. Validar archivo
    if (!archivo) throw new Error("Debe subir un archivo de convocatoria");

    const formatosValidos = ["image/jpeg", "image/png", "application/pdf"];
    if (!formatosValidos.includes(archivo.mimetype)) {
        throw new Error("Formato de archivo no válido");
    }

    // 3. Guardar en base de datos
    const nuevo = await torneoModel.crear({
        nombre,
        categoria,
        archivo: archivo.filename
    });

    return nuevo;
};
