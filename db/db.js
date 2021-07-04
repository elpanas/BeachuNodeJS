const mongoose = require('mongoose'),
  redisMongoose = require('redis_mongoose'),
  config = require('../config/config'),
  {
    db: { dbUri, dbOptions },
    redis: { redisUri },
  } = config,
  messageOk = 'Connected to MongoDB...',
  errorMessage = 'Could not connect to MongoDB...';

redisMongoose.init(mongoose, redisUri);

mongoose
  .connect(dbUri, dbOptions)
  .then(() => console.log(messageOk))
  .catch((err) => console.error(errorMessage, err));
