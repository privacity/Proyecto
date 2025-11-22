const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournament.controller');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.post('/create', auth, upload.single('file'), tournamentController.createTournament);

module.exports = router;