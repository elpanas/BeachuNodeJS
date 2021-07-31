const mongoose = require('mongoose'),
  redisMongoose = require('redis_mongoose'),
  config = require('../config/config'),
  messageOk = 'Connected to MongoDB...',
  errorMessage = 'Could not connect to MongoDB...',
  {
    db: { uri, options },
    redis: { redisUri },
  } = config;

redisMongoose.init(mongoose, redisUri);

mongoose
  .connect(uri, options)
  .then(() => console.log(messageOk))
  .catch((err) => console.error(errorMessage, err));
