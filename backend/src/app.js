const express = require('express');
const app = express();
const tournamentRoutes = require('./routes/tournament.routes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Tonet backend works');
});

// Mount routes
app.use('/api/tournaments', tournamentRoutes);

app.listen(1911, () => {
    console.log('Server is running on port 1911');
});