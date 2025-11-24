const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournament.controller');
const upload = require('../middlewares/uploadConvocatoria');

router.post('/create', upload.single('convocatoria'), tournamentController.create);
router.get('/current', tournamentController.getCurrentTournaments);
router.get('/list', tournamentController.listTournaments);

module.exports = router;
