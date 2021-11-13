const {
    app: { port },
  } = require('./config/config'),
  express = require('express'), // FRAMEWORK
  compression = require('compression'), // MIDDLEWARES
  helmet = require('helmet'),
  app = express(),
  restbath = require('./routes/restbath'), // ROUTES
  clusterTest = require('./routes/clustertest'),
  listenMessage = `Listening on port ${port}...`;

// MIDDLEWARES ACTIVACTION
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ROUTES
app.get('/', (req, res) => res.send('BeachU Web Service'));

app.use('/api/bath', restbath);
app.use('/api/clustertest', clusterTest);

const server = app.listen(port, () => console.log(listenMessage));

module.exports = server;
