require('dotenv').config();
const config = {
  app: {
    port: process.env.PORT || 3000,
    auth: process.env.HASH_AUTH,
  },
  db: {
    uri: process.env.DB_URI,
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
