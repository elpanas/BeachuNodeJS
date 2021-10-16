const express = require('express'), // FRAMEWORK
  app = express(),
  config = require('./config/config'), // CONFIGURATIONS
  compression = require('compression'), // MIDDLEWARES
  cluster = require('cluster'),
  helmet = require('helmet'),
  restbath = require('./routes/restbath'), // ROUTES
  listenMessage = `Listening on port ${config.app.port}...`;

if (cluster.isMaster) {
  for (let i = 0; i < config.numCPUs; i += 1) cluster.fork(); // Create a worker for each CPU

  cluster.on('exit', () => cluster.fork()); // Listen for dying workers and replace them
} else {
  require('./db/db'); // DATABASE CONNECTIONS
  // MIDDLEWARES ACTIVACTION
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ROUTES
  app.get('/', (req, res) => res.send('BeachU Web Service'));

  app.use('/api/bath', restbath);

  app.listen(config.app.port, () => console.log(listenMessage));
}

//module.exports.server = server;
