// index.js
const express = require('express');
const app = express();
const PORT = 3001;

// express
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('Hello, from backend!');
});

// start
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});