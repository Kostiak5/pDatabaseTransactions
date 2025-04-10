const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

const models = require('./routes/api/models');
const items = require('./routes/api/items');


connectDB();
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/models', models);

app.use('/api/items', items);


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));