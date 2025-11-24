const express = require('express');
const path = require('path');
const app = express();
const tournamentRoutes = require('./routes/tournament.routes');

app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../../public')));

app.get('/', (req, res) => {
    res.send('Tonet backend works');
});

// Mount routes
app.use('/api/tournaments', tournamentRoutes);

app.listen(1911, () => {
    console.log('Server is running on port 1911');
});