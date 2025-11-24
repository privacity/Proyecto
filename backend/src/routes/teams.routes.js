const express = require("express");
const router = express.Router();
const TournamentController = require("../controllers/tournament.controller");
const upload = require("../middlewares/uploadConvocatoria");

// Ruta CU1
router.post(
    "/create",
    upload.single("convocatoria"),
    TournamentController.create
);

module.exports = router;
