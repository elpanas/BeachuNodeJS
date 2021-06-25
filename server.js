require('./db/db'); // DATABASE CONNECTIONS
const express = require('express'); // FRAMEWORK
const app = express(),
  config = require('./config/config'), // CONFIGURATIONS
  compression = require('compression'), // MIDDLEWARES
  helmet = require('helmet'),
  restbath = require('./routes/restbath'); // ROUTES

// MIDDLEWARES ACTIVACTION
app.use(helmet());
app.use(compression());
app.use(express.json());

// ROUTES
app.get('/', (req, res) => res.send('BeachU Web Service'));
app.use('/api/bath', restbath);

app.listen(config.app.port, () =>
  console.log(`Listening on port ${config.app.port}...`)
);
