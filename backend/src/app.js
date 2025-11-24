require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static('public'));


// Para recibir JSON en peticiones normales
app.use(express.json());

// Para recibir datos de formularios (textos)
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, imágenes, HTML)
app.use(express.static(path.join(__dirname, "public")));

// Importar rutas del backend
const tournamentRoutes = require('./routes/tournament.routes');


// Montar rutas
app.use("/api/tournaments", tournamentRoutes);

// Ruta base de prueba
app.get("/", (req, res) => {
    res.send("TorNet backend works");
});

// Iniciar servidor
const PORT = process.env.PORT || 1911;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
