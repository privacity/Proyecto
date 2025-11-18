const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Tonet backend works');
});

app.listen(1911, () => {
    console.log('Server is running on port 1911');
});