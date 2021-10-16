require('dotenv').config();
const mongoUser = process.env.MONGO_USER,
  mongoPassword = process.env.MONGO_PASSWORD,
  mongoHost = process.env.MONGO_HOST,
  mongoPort = process.env.MONGO_PORT;
const config = {
  app: {
    port: process.env.WEB_SERVICE_PORT || 3000,
    auth: process.env.HASH_AUTH,
  },
  db: {
    // uri: process.env.DB_URI,
    uri: `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/`,
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
