const mongoose = require('mongoose'),
  config = require('../config/config'),
  {
    db: { uri, options },
  } = config,
  messageOk = 'Connected to MongoDB...',
  errorMessage = 'Could not connect to MongoDB...';

mongoose
  .connect(uri, options)
  .then(() => console.log(messageOk))
  .catch((err) => console.error(errorMessage, err));
