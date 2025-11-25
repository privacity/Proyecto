const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournament.controller');
const upload = require('../middlewares/uploadConvocatoria');

router.post('/create', upload.single('convocatoria'), tournamentController.create);
router.get('/current', tournamentController.getCurrentTournaments);
router.get('/list', tournamentController.listTournaments);
router.get('/:id', tournamentController.getTournamentById);
router.put('/:id', tournamentController.updateTournament);
router.get('/convocatorias', tournamentController.getActiveConvocatorias); // Nueva ruta para obtener convocatorias activas
router.post('/inscribir/:id', tournamentController.inscribirEquipo); // Nueva ruta para inscribir equipos

module.exports = router;
