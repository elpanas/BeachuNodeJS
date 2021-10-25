require('dotenv').config();
const mongoUser = process.env.MONGO_USER,
  mongoPassword = process.env.MONGO_PASSWORD,
  mongoHost = process.env.MONGO_HOST,
  mongoPort1 = process.env.MONGO_PORT1,
  mongoPort2 = process.env.MONGO_PORT2,
  mongoPort3 = process.env.MONGO_PORT3,
  config = {
    app: {
      port: process.env.WEB_SERVICE_PORT || 3000,
      auth: process.env.HASH_AUTH,
    },
    db: {
      // uri: process.env.DB_URI,
      uri: `mongodb://${mongoHost}:${mongoPort1},${mongoHost}:${mongoPort2},${mongoHost}:${mongoPort3}/`,
      // uri: 'mongodb://localhost:27017/',
      // uri: `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/`,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: false,
        useFindAndModify: false,
      },
    },
    redis: {
      redisUri: process.env.REDIS_URL,
      time: 120,
    },
    numCPUs: require('os').cpus().length,
  };

module.exports = config;
