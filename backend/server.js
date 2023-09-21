const express = require('express');
const cors = require('cors');
const wordsRoutes = require('./routes/words');
const { loadFromCSV } = require('./utils/loadcsv');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/word', wordsRoutes);

loadFromCSV();

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});