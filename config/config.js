require('dotenv').config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoHost = process.env.MONGO_HOST;
const mongoPort1 = process.env.MONGO_PORT1;
const mongoPort2 = process.env.MONGO_PORT2;
const mongoPort3 = process.env.MONGO_PORT3;
const mongoDb = process.env.MONGO_DB;
const mongoDbTest = process.env.DB_URI_TEST;

const config = {
  app: {
    port: process.env.WEB_SERVICE_PORT || 3000,
    auth: process.env.HASH_AUTH,
  },
  db: {
    uri: process.env.DB_URI,
    // uri: `mongodb://${mongoHost}:${mongoPort1},${mongoHost}:${mongoPort2},${mongoHost}:${mongoPort3}/${mongoDb}?replicaSet=beachu_set`,
    // uri: 'mongodb://localhost:27017/',
    // uri: `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/`,
    options: {
      useUnifiedTopology: true,
      autoIndex: false,
      autoCreate: true,
    },
  },
  redis: {
    redisUri: process.env.REDIS_URL,
    time: 120,
  },
  numCPUs: require('os').cpus().length,
};

module.exports = config;
