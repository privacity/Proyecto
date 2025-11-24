const knex = require('../../../database/knex');
const bcrypt = require('bcrypt'); // Para cifrar contraseñas

const authController = {
    async register(req, res) {
        try {
            const { nombreCompleto, correoElectronico, contrasena, rol } = req.body;

            // Validar que todos los campos estén presentes
            if (!nombreCompleto || !correoElectronico || !contrasena || !rol) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
            }

            // Validar que el rol sea válido
            if (!['Organizador', 'Representante'].includes(rol)) {
                return res.status(400).json({ error: 'El rol seleccionado no es válido.' });
            }

            // Verificar si el correo ya está registrado
            const existingUser = await knex('Usuario').where('correoElectronico', correoElectronico).first();
            if (existingUser) {
                return res.status(400).json({ error: 'El correo ya está registrado.' });
            }

            // Cifrar la contraseña
            const hashedPassword = await bcrypt.hash(contrasena, 10);

            // Insertar el nuevo usuario en la base de datos
            await knex('Usuario').insert({
                nombreCompleto,
                correoElectronico,
                contrasenaCifrada: hashedPassword,
                rol
            });

            res.status(201).json({ message: 'Usuario registrado exitosamente.' });
        } catch (err) {
            console.log('Datos recibidos:', { nombreCompleto, correoElectronico, contrasena, rol });
            console.error('Error interno:', err);
            res.status(500).json({ error: 'Error interno del servidor.' });
        }
    }
};

module.exports = authController;