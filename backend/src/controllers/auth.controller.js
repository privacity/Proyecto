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
    },
    async login(req, res) {
        try {
            console.log('Datos recibidos:', req.body);

            const { correoElectronico, contrasena } = req.body;

            if (!correoElectronico || !contrasena) {
                console.error('Faltan campos obligatorios.');
                return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
            }

            const user = await knex('Usuario').where('correoElectronico', correoElectronico).first();

            if (!user) {
                console.error('Usuario no encontrado:', correoElectronico);
                return res.status(404).json({ error: 'Usuario no encontrado.' });
            }

            const isPasswordValid = await bcrypt.compare(contrasena, user.contrasenaCifrada);

            if (!isPasswordValid) {
                console.error('Contraseña incorrecta para:', correoElectronico);
                return res.status(401).json({ error: 'Contraseña incorrecta.' });
            }

            console.log('Inicio de sesión exitoso para:', correoElectronico);
            res.status(200).json({ message: 'Inicio de sesión exitoso.', rol: user.rol });
        } catch (err) {
            console.error('Error en el login:', err);
            res.status(500).json({ error: 'Error interno del servidor.' });
        }
    }
};

module.exports = authController;