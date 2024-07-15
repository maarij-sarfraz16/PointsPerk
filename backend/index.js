const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

// Loading environment variables from .env file
require('dotenv').config({ path: '../.env' });

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/signup', require('./routes/signup'));


app.listen(port, () => {
  console.log(`Points Perk backend listening at http://localhost:${port}`)
});