const config = require('./config/config'),
  express = require('express'), // FRAMEWORK
  compression = require('compression'), // MIDDLEWARES
  helmet = require('helmet'),
  app = express(),
  restbath = require('./routes/restbath'), // ROUTES
  listenMessage = `Listening on port ${config.app.port}...`;

process.env.NODE_ENV == 'test' ? require('./db/db-test') : require('./db/db'); // DATABASE CONNECTIONS
// MIDDLEWARES ACTIVACTION
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ROUTES
app.get('/', (req, res) => res.send('BeachU Web Service'));

app.use('/api/bath', restbath);

const server = app.listen(config.app.port, () => console.log(listenMessage));

module.exports = server;
