require('./db/db'); // DATABASE CONNECTIONS
const express = require('express'), // FRAMEWORK
  app = express(),
  config = require('./config/config'), // CONFIGURATIONS
  compression = require('compression'), // MIDDLEWARES
  helmet = require('helmet'),
  restbath = require('./routes/restbath'), // ROUTES
  listenMessage = `Listening on port ${config.app.port}...`;

// MIDDLEWARES ACTIVACTION
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get('/', (req, res) => res.send('BeachU Web Service'));

app.use('/api/bath', restbath);

app.listen(config.app.port, () => console.log(listenMessage));
