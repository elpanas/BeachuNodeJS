const mongoose = require('mongoose');
const redisMongoose = require('redis_mongoose');
const {
  db: { uri, options },
  redis: { redisUri },
} = require('../config/config');

const messageOk = 'Connected to MongoDB...';
// const errorMessage = 'Could not connect to MongoDB...';

redisMongoose.init(mongoose, redisUri);

// eslint-disable-next-line no-console
mongoose.connect(uri, options).then(() => console.log(messageOk));
// .catch((err) => console.error(errorMessage, err));
