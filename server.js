const config = require('./config/config'),
  cluster = require('cluster');

if (cluster.isMaster) {
  for (let i = 0; i < config.numCPUs; i += 1) cluster.fork(); // Create a worker for each CPU

  cluster.on('exit', () => cluster.fork()); // Listen for dying workers and replace them
} else {
  require('./app');
}
