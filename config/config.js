require('dotenv').config();
const config = {
  app: {
    port: process.env.PORT || 3000,
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
    uri: process.env.REDIS_URL,
    time: 120,
  },
};

module.exports = config;
